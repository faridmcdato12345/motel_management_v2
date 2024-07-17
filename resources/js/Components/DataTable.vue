<template>
    <div class="relative overflow-x-auto">
        <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <div>
                <div :class="[$slots.export ? 'flex' : '']">
                    <div>
                        <label>Limit to: </label>
                        <select @change="$emit('limitQuery', 'query', $event.target.value)" v-model="props.queryLimit"
                            class="rounded">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div v-if="$slots.export" class="card-header ml-4">
                        <slot name="export" />
                    </div>
                </div>
            </div>
            <label for="table-search" class="sr-only">Search</label>
            <div class="relative">
                <div
                    class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-900 dark:text-gray-900" aria-hidden="true" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="table-search"
                    class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :placeholder="props.placeholder" @blur="$emit('searchFieldQuery', 'name', $event.target.value)"
                    @keyup.enter="$emit('searchFieldQuery', 'name', $event.target.value)" v-model="props.queryName">
            </div>
        </div>
        <div class="overflow-x">
            <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-900">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-wrap" v-for="column in columns" :key="column.key">
                            {{ column.label }}
                        </th>
                        <th v-if="checkout" scope="col" class="px-6 py-3">ACTION</th>
                        <th v-if="action" scope="col" class="px-6 py-3">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredData" :key="item.id"
                        class="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td v-for="column in columns" :key="column.key" class="px-6 py-4">
                            <p>{{ getNestedValue(item, column.key) }}</p>
                            <!-- <p>{{ item[column.key] }}</p> -->
                        </td>
                        <td v-if="action" class="px-6 py-4 flex space-x-4">
                            <PrimaryButton v-if="addUser" @click="$emit('addUser', item.id)">Add User</PrimaryButton>
                            <PrimaryButton @click="$emit('edit', item.id)">Edit</PrimaryButton>
                            <DangerButton @click="$emit('delete', item.id)">Delete</DangerButton>
                        </td>
                        <td v-if="checkout" class="px-6 py-4 flex space-x-4">
                            <DangerButton @click="$emit('checkout', item.id)">Check Out</DangerButton>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

        <Pagination :links="props.pagination.links" v-if="props.pagination" @page-changed="fetchPageData" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from './Pagination.vue';
import { getNestedValue } from '@/util';
import PrimaryButton from './PrimaryButton.vue';
import DangerButton from './DangerButton.vue';
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
    placeholder: String
})
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
</script>

<style lang="scss" scoped></style>