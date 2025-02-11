<template>
    <div class="relative overflow-x-auto h-auto ">
        <div class="grid grid-cols-2 md:grid-cols-5 w-full content-area py-4">
            <div v-for="item in filteredData" :key="item.id" class="h-full border border-white">
                <div v-for="column in columns" :key="column.key" class="p-2 h-full hover:cursor-pointer relative"
                    :class="getRowClass(item.status)" @click.prevent="showModal(item, item.status)">
                    <p class="absolute top-2 left-2 text-md font-bold hidden lg:show">Room</p>
                    <div class="h-full min-h-32 max-h-40">
                        <div class="relative">
                            <p class="font-black text-md md:text-4xl">{{ getNestedValue(item, column.key) }}</p>
                            <div class="absolute top-0 right-0 text-[0.70rem]">
                                <span></span>
                                <span>{{ item.capacity_status }}</span>
                                <span>/</span>
                                <span>{{ item.maximum_capacity }}</span>
                            </div>
                            <div class="h-full flex flex-col items-left space-y-2 justify-center max-h-40 mt-2 md:mt-2"
                                v-if="item.status === 'Out of Service'">
                                <div class="text-xxs md:text-xs flex font-black space-x-2  p-1 rounded-full items-center"
                                    :class="detailButton(item.status)">
                                    <label for="" class="text-nowrap">Repair Date:</label>
                                    <p>{{ roomRepairStart(item.room_repairs) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Date Availability:</label>
                                    <p>{{ availabilityDate(item.room_repairs) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Room Status:</label>
                                    <p>Under Repair</p>
                                </div>
                            </div>
                            <div class="h-full flex flex-col items-left space-y-2 justify-center max-h-32 mt-2 md:mt-2"
                                v-if="item.status === 'Checked Out'">
                                <div class="text-xxs md:text-xs flex font-black space-x-2  p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Check-in Date:</label>
                                    <p>{{ checkInDetail(item.bookings) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Check-out Date:</label>
                                    <p>{{ checkOutDetail(item.bookings) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Voucher Status:</label>
                                    <p>{{ voucherStatusDetail(item.bookings) }}</p>
                                </div>
                            </div>
                            <div class="h-full flex flex-col items-left space-y-2 justify-center max-h-32 mt-2 md:mt-2"
                                v-if="item.status === 'In Use'">
                                <div v-if="item.capacity_status > 1" @click.stop="showMore(item)">
                                    <div class="text-xxs md:text-xs flex font-black space-x-2  p-1 rounded-full justify-center "
                                        :class="detailButton(item.status)">
                                        <p>show more</p>
                                    </div>
                                </div>
                                <div class="flex flex-col space-y-1" v-else>
                                    <div class="text-xxs md:text-xs flex font-black space-x-2  p-1 rounded-full"
                                        :class="detailButton(item.status)">
                                        <label for="">Check-in Date:</label>
                                        <p>{{ checkInDetail(item.bookings) }}</p>
                                    </div>
                                    <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                        :class="detailButton(item.status)">
                                        <label for="">Check-out Date:</label>
                                        <p>{{ checkOutDetail(item.bookings) }}</p>
                                    </div>
                                    <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                        :class="detailButton(item.status)">
                                        <label for="">Voucher Status:</label>
                                        <p>{{ voucherStatusDetail(item.bookings) }}</p>
                                    </div>
                                </div>

                            </div>
                            <div class="h-full flex flex-col items-left space-y-2 justify-center max-h-32 mt-2 md:mt-2"
                                v-if="item.status === 'Shared'">
                                <div class="text-xxs md:text-xs flex font-black space-x-2  p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Check-in Date:</label>
                                    <p>{{ checkInDetail(item.bookings) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Check-out Date:</label>
                                    <p>{{ checkOutDetail(item.bookings) }}</p>
                                </div>
                                <div class="text-xxs md:text-xs font-black flex space-x-2 p-1 rounded-full"
                                    :class="detailButton(item.status)">
                                    <label for="">Voucher Status:</label>
                                    <p>{{ voucherStatusDetail(item.bookings) }}</p>
                                </div>
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
                        <div class="flex flex-col" v-if="availableStatus">
                            <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="checkIn">Check In</button>
                            <button class="w-full bg-gray-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="repair">Repair</button>
                        </div>
                        <div v-if="checkOutStatus">
                            <button class="w-full bg-green-500 p-4 rounded-md  mt-4" @click.prevent="checkIn">Re-check
                                In</button>
                            <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="showModalCheckOutConfirm">Check Out</button>
                        </div>
                        <div v-if="inUseStatus">
                            <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="checkIn">Check In</button>
                            <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4"
                                @click.prevent="showModalCheckOutConfirm">Check Out</button>
                            <button class="w-full bg-green-500 p-4 rounded-md  mt-4"
                                @click.prevent="recheckInCheckedIn">Re-check
                                In</button>
                        </div>
                        <button class="w-full bg-green-500 p-4 rounded-md text-white mt-4" v-if="outOfServiceStatus"
                            @click.prevent="backToService">Back to Service</button>
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
        <Modal :show="modalCheckOut">
            <div class="p-4">
                <div>
                    <form @submit.prevent="">
                        <div class="border-dashed border-gray-600 border-2 p-4">
                            <div class="space-y-2 mb-4">
                                <p class="text-md font-black">Check out date</p>
                                <input type="date" v-model="checkOutDate" class="w-full">
                            </div>
                        </div>
                    </form>
                    <button class="w-full bg-green-400 p-4 rounded-md text-white mt-4"
                        @click.prevent="checkOut">Submit</button>
                    <button class="w-full bg-red-400 p-4 rounded-md text-white mt-4"
                        @click.prevent="modalCheckOut = false">Cancel</button>
                </div>
            </div>
        </Modal>
        <Modal :show="modalFull">
            <div class="p-4">
                <div>
                    <p>THE ROOM REACH ITS MAXIMUM CAPACITY</p>
                    <p>Please choose another room</p>
                </div>
                <button class="w-full bg-green-400 p-4 rounded-md text-white mt-4"
                    @click.prevent="modalFull = false">Ok</button>
            </div>
        </Modal>
        <Modal :show="modalIsSharable">
            <div class="p-4">
                <div>
                    <p>Are you sure the guest wants a sharable room?</p>
                </div>
                <button class="w-full bg-green-400 p-4 rounded-md text-white mt-4"
                    @click.prevent="showIsSharable">Yes</button>
                <button class="w-full bg-rose-400 p-4 rounded-md text-white mt-4"
                    @click.prevent="modalIsSharable = false">No</button>
            </div>
        </Modal>
        <ShowMore :modal-is-sharable="showMoreModal" :room="roomId" :room-booking-details="roomBookingDetails"
            @recheck-in="recheckInCheckedIn" @close-show-more="showMoreModal = false" />
    </div>
</template>

<script setup>
import ShowMore from "./ShowMore.vue";
import Modal from "@/Components/Modal.vue";
import { ref, computed, watch } from 'vue';
import { getNestedValue } from '@/util';
import useData from '@/Composables/useData'
import { useForm } from '@inertiajs/vue3';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const modalCheckOut = ref(false)
const modalShow = ref(false)
const checkoutdate = ref('')
const voucherStatus = ref('')
const checkOutStatus = ref(false)
const availableStatus = ref(false)
const checkOutDate = ref('')
const roomId = ref('')
const modalRepairShow = ref(false)
const repairDate = ref();
const availableDate = ref()
const inUseStatus = ref()
const modalFull = ref(false)
const showMoreModal = ref(false)
const outOfServiceStatus = ref(false)
const modalIsSharable = ref(false)
const roomBookingDetails = ref([])
const { isLoading, error, storeItem, fetchItem, updateItem } = useData()

const emit = defineEmits(['checkIn', 'recheckInCheckedIn'])
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
const showMore = (index) => {
    roomId.value = index.id
    showMoreModal.value = true
}
const showModalCheckOutConfirm = () => {
    modalCheckOut.value = true
}

const roomRepairStart = (result) => {
    const start = Object.keys(result).map(key => {
        return result[key].start_of_repair
    })
    const end = Object.keys(result).map(key => {
        return result[key].end_of_repair
    })
    const startDate = new Date(start.toString())
    const endDate = new Date(end.toString())
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return startDate.toLocaleDateString('en-US', option) + '-' + endDate.toLocaleDateString('en-US', option)

}
const recheckInCheckedIn = () => {
    emit('recheckInCheckedIn', roomId.value)
}
const availabilityDate = (result) => {
    const available = Object.keys(result).map(key => {
        return result[key].availability_date
    })
    const availableDate = new Date(available.toString())
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return availableDate.toLocaleDateString('en-US', option)
}
const checkOutDetail = (result) => {
    const newdata = Object.keys(result).map(key => {
        if (result[key].manual_check_out) {
            return result[key].manual_check_out
        }
        return result[key].check_out_date
    })
    const formatedDate = new Date(newdata.toString())
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return formatedDate.toLocaleDateString('en-US', option)
}
const checkInDetail = (result) => {
    const newdata = Object.keys(result).map(key => {
        return result[key].check_in_date
    })
    const formatedDate = new Date(newdata.toString())
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return formatedDate.toLocaleDateString('en-US', option)
}
const voucherStatusDetail = (result) => {
    const newdata = Object.keys(result).map(key => {
        if (result[key].manual_check_out) {
            return result[key].manual_check_out
        }
        return result[key].check_out_date
    })
    const currentDate = new Date()
    const dueDate = new Date(newdata.toString())
    const startOfDayDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const startOfDayCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    if (startOfDayCurrentDate > startOfDayDueDate) {
        return voucherStatus.value = 'Overdue'
    } else if (startOfDayCurrentDate < startOfDayDueDate) {
        return voucherStatus.value = 'Active'
    } else {
        return voucherStatus.value = 'Due'
    }
}
const saveRepair = () => {
    const newFormData = useForm({
        start_of_repair: repairDate.value[0],
        end_of_repair: repairDate.value[1],
        availability_date: availableDate.value,
        room_id: roomId.value
    })
    newFormData.post(route('room.repair'), {
        onSuccess: () => {
            availableStatus.value = false
            modalRepairShow.value = false
            modalShow.value = false
            preserveState: true
        },
        onError: (error) => { }
    })
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
    outOfServiceStatus.value = false
}
const showIsSharable = () => {
    modalIsSharable.value = false
    modalShow.value = true
}
const showModal = (index, status) => {
    roomId.value = index.id
    if (index.maximum_capacity == index.capacity_status) {
        modalFull.value = true
    } else if (index.capacity_status != 0 && index.maximum_capacity != index.capacity_status) {
        modalIsSharable.value = true
        inUseStatus.value = true
    }
    else {
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
        } else if (status === 'Out of Service') {
            outOfServiceStatus.value = true
        }
    }


}

const toggleDetails = (index) => {
    expandedRows.value[index] = !expandedRows.value[index];
};

const backToService = async () => {
    const formData = useForm({
        status: 'Available'
    })
    formData.patch(route('rooms.update', roomId.value), formData, {

    })
    outOfServiceStatus.value = false
    checkOutStatus.value = false
    modalShow.value = false
}
const checkOut = () => {
    inUseStatus.value = false
    const formData = useForm({
        status: 'Available',
        manual_check_out: checkOutDate.value
    })
    formData.patch(route('rooms.update', roomId.value), formData, {
        preserveState: false,
        onSuccess: () => {
            modalCheckOut.value = false
        }
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
const detailButton = (status) => {
    return {
        'bg-green-300': status === 'Available',
        'bg-rose-300': status === 'Checked Out',
        'bg-gray-200': status === 'Out of Service',
        'bg-sky-200': status === 'Shared',
        'bg-blue-200': status === 'In Use',
    }
}
watch(showMoreModal, (newValue) => {
    if (newValue) {
        axios.get(`/room_voucher_details/${roomId.value}`)
            .then((response) => {
                console.log(response)
                roomBookingDetails.value = response.data
                console.log("roomBookingDetails.value: ", roomBookingDetails.value)
            })
            .catch((error) => console.log(error))
    }
})
</script>

<style scoped>
.content-area {
    height: calc(100vh - 4rem);
}
</style>