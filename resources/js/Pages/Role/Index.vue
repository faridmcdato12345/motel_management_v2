<template>

    <Head title="Role" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <Link :href="route('roles.create')">
            <PrimaryButton>Create</PrimaryButton>
            </Link>
            <DataTable :data="props.roles.data" :columns="columns" :pagination="props.roles" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName" :action="true"
                :placeholder="placeholder" :delete-button="false" />
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DataTable from "@/Components/DataTable.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, computed, onMounted } from "vue"
import { router, Head, useForm, usePage, Link } from "@inertiajs/vue3";
import useData from '@/Composables/useData'


const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const showModal = ref(false)
const showModalEdit = ref(false)
const itemId = ref('')
const selectedMotel = ref('')
const placeholder = ref('Search for case number')

const page = usePage();
const userRoles = computed(() => page.props.userRoles);
const userPermissions = computed(() => page.props.userPermissions);
console.log("userRoles: ", userRoles)
console.log("userPermissions: ", userPermissions)


const formFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        select: false
    },
];

const formData = useForm({
    price_per_night: '',
    status: '',
})
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'ROLE', key: 'name' },
])
const props = defineProps({
    roles: {
        type: Object,
    },
    queryLimit: Number
})
const editData = (id) => {
    router.get(route('roles.edit', id))
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
    router.get(route('roles.index', params))
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
    router.get(route('roles.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this role?')) {
        router.delete(route('roles.destroy', id), {
            preserveState: true
        })
    }

}
onMounted(() => {
    console.log(props.roles)
})
</script>

<style lang="scss" scoped></style>