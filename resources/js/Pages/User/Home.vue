<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <DataTable :data="props.guests.data" :columns="columns" :pagination="props.guests" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="true" />
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
    { label: 'CASE #', key: 'vouchers.case_number' },
    { label: 'GUEST NAME', key: 'vouchers.guests.first_name' },
    { label: 'AGE GROUP', key: 'vouchers.guests.types.name' },
])
const props = defineProps({
    guests: {
        type: Object,
    },
})
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
    console.log(props.guests)
})
</script>

<style lang="scss" scoped></style>