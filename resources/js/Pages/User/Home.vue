<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <DataTable :data="props.vouchers" :columns="columns" :pagination="props.vouchers" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData" @checkout="checkout"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="false" :checkout="true" />
        </div>
        <div>
            <NavBottom />
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import NavBottom from "@/Components/NavBottom.vue"
import DataTable from "@/Components/DataTable.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, onMounted } from "vue"
import { router, Head, useForm, usePage } from "@inertiajs/vue3";

const columns = ref([
    { label: 'CASE #', key: 'case_number' },
    { label: 'GUEST FIRST NAME', key: 'guests.first_name' },
    { label: 'GUEST LAST NAME', key: 'guests.last_name' },
    { label: 'AGE GROUP', key: 'guests.types.name' },
    { label: 'CHECK IN DATE', key: 'guests.bookings.check_in_date' },
    { label: 'STATUS', key: 'guests.bookings.status' },
])
const props = defineProps({
    vouchers: {
        type: Object,
    },
})
const checkout = () => {
    console.log("checkout")
}
const limitQuery = (name, e) => {
    let qParams = {}
    let nParams = {}
    let params = {}
    if (props.queryName) {
        nParams['name'] = props.queryName
        qParams[name] = e

        params = { ...qParams, ...nParams }
    } else if (!props.queryName) {
        qParams[name] = e
        params = qParams
    } else {
        delete qParams[name]
        delete nParams['name']
    }
    router.get(route('users.index', params))
}
const searchFieldQuery = (name, e) => {
    let qParams = {}
    let nParams = {}
    let params = {}
    if (props.queryLimit) {
        nParams[name] = e
        qParams['query'] = props.queryLimit

        params = { ...nParams, ...qParams }
    } else if (!props.queryLimit) {
        nParams[name] = e
        params = nParams
    } else {
        delete qParams[name]
        delete nParams['name']
    }
    router.get(route('users.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        router.delete(route('users.destroy', id), {
            preserveState: true
        })
    }
}
onMounted(() => {
    console.log(props.vouchers)
})
</script>

<style lang="scss" scoped></style>