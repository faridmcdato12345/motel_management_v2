<template>
    <div class="relative overflow-x-auto h-auto ">
        <div class="grid grid-cols-3 md:grid-cols-5 w-full content-area py-4">
            <div v-for="item in filteredData" :key="item.id" class="h-full border border-white">
                <div v-for="column in columns" :key="column.key" class="p-2 h-full hover:cursor-pointer relative"
                    :class="getRowClass(item.status)" @click.prevent="showModal(item, item.status)">
                    <p class="absolute top-2 left-2 text-md font-bold hidden lg:show">Room</p>
                    <div class="h-full">
                        <div class="relative">
                            <p class="font-black text-md md:text-4xl">{{ getNestedValue(item, column.key) }}</p>
                            <div v-if="item.status === 'Checked Out'" class="h-full flex items-center">
                                <p>{{ getDetails(item.bookings) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal :show="modalShow">
            <div class="p-4">
                <div>
                    <form @submit.prevent="">
                        <div class="border-dashed border-gray-600 border-2 p-4" v-if="checkOutStatus">
                            <p class="text-md font-black">Checkout Date: {{ checkoutdate }}</p>
                            <p class="text-md font-black">Voucher Status: {{ voucherStatus }}</p>
                        </div>
                        <div class="flex flex-col" v-if="availableStatus">
                            <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="checkIn">Check In</button>
                            <button class="w-full bg-gray-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="repair">Repair</button>
                        </div>
                        <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4" v-if="checkOutStatus"
                            @click.prevent="checkIn">Re-check In</button>
                        <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4" v-if="inUseStatus"
                            @click.prevent="checkOut">Check Out</button>
                        <button class="w-full bg-red-400 p-4 rounded-md text-white mt-4"
                            @click.prevent="modalClose">Cancel</button>
                    </form>
                </div>
            </div>
        </Modal>
        <Modal :show="modalRepairShow">
            <div class="p-4">
                <div>
                    <form @submit.prevent="">
                        <div class="border-dashed border-gray-600 border-2 p-4">
                            <div class="space-y-2 mb-4">
                                <p class="text-md font-black">How many days to repair?</p>
                                <VueDatePicker v-model="repairDate" range :enable-time-picker="false" />
                            </div>
                            <div class="space-y-2">
                                <p class="text-md font-black">Expected date to be availble:</p>
                                <VueDatePicker v-model="availableDate" :enable-time-picker="false" />
                            </div>
                        </div>

                    </form>
                    <button class="w-full bg-green-400 p-4 rounded-md text-white mt-4"
                        @click.prevent="saveRepair">Save</button>
                    <button class="w-full bg-red-400 p-4 rounded-md text-white mt-4"
                        @click.prevent="modalClose">Cancel</button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import DangerButton from "./DangerButton.vue";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from './PrimaryButton.vue';
import { ref, computed } from 'vue';
import { getNestedValue } from '@/util';
import useData from '@/Composables/useData'
import { router, useForm } from '@inertiajs/vue3';
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { onMounted } from "vue";

const modalShow = ref(false)
const checkoutdate = ref('')
const voucherStatus = ref('')
const checkOutStatus = ref(false)
const availableStatus = ref(false)
const roomId = ref('')
const modalRepairShow = ref(false)
const repairDate = ref();
const availableDate = ref()
const inUseStatus = ref()
const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const props = defineProps({
    content: String,
    data: {
        type: Array,
        required: true
    },
    addUser: {
        type: Boolean,
        default: false
    },
    action: {
        type: Boolean,
        default: false
    },
    columns: {
        type: Array,
        required: true
    },
    pagination: {
        type: Object,
        default: null
    },
    routeEdit: {
        type: String,
        required: true
    },
    routeDelete: {
        type: String,
        required: true
    },
    routeCreate: {
        type: String,
        required: true
    },
    queryLimit: {
        type: Number,
        required: true
    },
    queryName: {
        type: String,
        required: true
    },
    logo: {
        type: Boolean,
        default: false
    },
    checkout: {
        type: Boolean,
        default: false
    },
    deleteButton: {
        type: Boolean,
        default: true
    },
    placeholder: String
})
const expandedRows = ref({});
const getDetails = (result) => {
    let d = result.forEach(element => {
        return element.check_out_date
    });
    return d
}
const saveRepair = () => {
    console.log("save repair")
}
const repair = () => {
    modalRepairShow.value = true
    modalShow.value = false
}
const modalClose = () => {
    checkOutStatus.value = false
    availableStatus.value = false
    modalShow.value = false
    modalRepairShow.value = false
    inUseStatus.value = false
}
const showModal = (index, status) => {
    roomId.value = index.id
    console.log(index)
    modalShow.value = true
    if (status === 'Checked Out') {
        checkOutStatus.value = true
        const currentDate = new Date()
        const dueDate = new Date(index.bookings[0].check_out_date)
        const startOfDayDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
        const startOfDayCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const option = { year: 'numeric', month: 'long', day: 'numeric' };
        checkoutdate.value = dueDate.toLocaleDateString('en-US', option)
        if (startOfDayCurrentDate > startOfDayDueDate) {
            voucherStatus.value = 'Overdue'
        } else {
            voucherStatus.value = 'Due'
        }
    } else if (status === 'Available') {
        availableStatus.value = true
    } else if (status === 'In Use' || status === 'Shared') {
        inUseStatus.value = true
    }

}

const toggleDetails = (index) => {
    expandedRows.value[index] = !expandedRows.value[index];
};
const emit = defineEmits(['checkIn'])
const backInService = async (id) => {
    const formData = useForm({
        status: 'Available'
    })
    formData.patch(route('rooms.update', id), formData, {
        preserveState: true,

    })

}
const checkOut = () => {
    inUseStatus.value = false
    const formData = useForm({
        status: 'Checked Out'
    })

    formData.patch(route('rooms.update', roomId.value), formData, {
        preserveState: false
    })

}
const checkIn = () => {
    emit('checkIn', roomId.value)
}
const searchQuery = ref('')
const filteredData = computed(() => {
    if (!searchQuery.value) return props.data;

    return props.data.filter(item => {
        return props.columns.some(column => {
            const value = getNestedValue(item, column.key);
            return String(value).toLowerCase().includes(searchQuery.value.toLowerCase());
        });
    })
})
const fetchPageData = (page) => {
    emit('page-changed', page)
}

const getRowClass = (status) => {
    return {
        'bg-gradient-to-t from-green-200 from-1% hover:bg-green-800': status === 'Available',
        'bg-gradient-to-t from-rose-300 from-1% hover:bg-rose-300': status === 'Checked Out',
        'bg-gradient-to-t from-gray-400 from-1% hover:bg-gray-200': status === 'Out of Service',
        'bg-gradient-to-t from-sky-200 from-1% hover:bg-sky-200': status === 'Shared',
        'bg-gradient-to-t from-sky-300 from-1% hover:bg-blue-200': status === 'In Use',
    };
};
onMounted(() => {
    console.log(props.data)
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    repairDate.value = [startDate, endDate];
    availableDate.value = startDate
})
</script>

<style scoped>
.content-area {
    height: calc(100vh - 4rem);
}
</style>