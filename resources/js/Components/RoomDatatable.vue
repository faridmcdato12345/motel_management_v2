<template>
    <div class="relative overflow-x-auto mt-4 mb-4">
        <div class="overflow-x">
            <table class="w-full text-sm text-center rtl:text-right text-gray-900 dark:text-gray-900">
                <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-900">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-wrap text-lg font-extrabold" v-for="column in columns"
                            :key="column.key">
                            {{ column.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in filteredData" :key="item.id">
                        <tr @click.prevent="toggleDetails(index)"
                            class="border-b dark:border-gray-700 hover:cursor-pointer"
                            :class="getRowClass(item.status)">
                            <td v-for="column in columns" :key="column.key" class="px-6 py-4">
                                <p>{{ getNestedValue(item, column.key) }}</p>
                            </td>
                        </tr>
                        <tr v-if="expandedRows[index]" :class="getRowClass(item.status)" class="border-b">
                            <td colspan="9" class="px-6 py-4">
                                <div class="flex items-center justify-center space-x-2">
                                    <PrimaryButton :class="item.status === 'Checked Out' ? 'show' : 'hidden'"
                                        @click.prevent="checkIn(item.id)">Recheck In
                                    </PrimaryButton>
                                    <PrimaryButton :class="item.status === 'Checked Out' ? 'show' : 'hidden'"
                                        @click.prevent="backInService(item.id)">Available
                                    </PrimaryButton>
                                    <PrimaryButton @click.prevent="checkOut(item.id)"
                                        :class="item.status === 'In Use' || item.status === 'Shared' ? 'show' : 'hidden'">
                                        Check Out
                                    </PrimaryButton>
                                    <PrimaryButton :class="item.status === 'Available' ? 'show' : 'hidden'"
                                        @click.prevent="checkIn(item.id)">Check In
                                    </PrimaryButton>
                                    <PrimaryButton @click.prevent="backInService(item.id)"
                                        :class="item.status === 'Out of Service' ? 'show' : 'hidden'">
                                        Back in Service</PrimaryButton>
                                </div>
                                <div :class="item.status === 'Out of Service' ? 'show' : 'hidden'">
                                    Reason
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import PrimaryButton from './PrimaryButton.vue';
import { ref, computed } from 'vue';
import { getNestedValue } from '@/util';
import useData from '@/Composables/useData'
import { router, useForm } from '@inertiajs/vue3';
import axios from 'axios';


const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const props = defineProps({
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
const checkOut = (id) => {
    const formData = useForm({
        status: 'Checked Out'
    })
    formData.patch(route('rooms.update', id), formData, {
        preserveState: true
    })
}
const checkIn = (id) => {
    emit('checkIn', id)
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
        'bg-green-900 hover:bg-green-800 text-white': status === 'Available',
        'bg-red-900 hover:bg-red-500 text-white': status === 'Checked Out',
        'bg-gray-600 hover:bg-gray-500 text-white': status === 'Out of Service',
        'bg-blue-400 hover:bg-blue-400 text-white': status === 'Shared',
        'bg-blue-900 hover:bg-blue-400 text-white': status === 'In Use',
    };
};
</script>

<style lang="scss" scoped></style>