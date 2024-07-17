<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <PrimaryButton @click.prevent="showModal = true">Create</PrimaryButton>
            <DataTable :data="props.rates.data" :columns="columns" :pagination="props.rates" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="true" />
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div class="">
                    <h6>Create Rate</h6>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit">
                        <InputLabel>Price Per Night:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required
                            v-model="formData.price_per_night" />
                        <InputLabel>Status:</InputLabel>
                        <select v-model="formData.status"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select status...</option>
                            <option value="Active">ACTIVE</option>
                            <option value="Inactive">INACTIVE</option>
                        </select>
                        <div class="flex justify-end">
                            <div>
                                <PrimaryButton>Create</PrimaryButton>
                                <DangerButton @click.prevent="showModal = false">Cancel</DangerButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
        <Modal :show="showModalEdit" @close="showModalEdit = false">
            <div class="p-4">
                <div class="">
                    <h6>Edit Rate</h6>
                </div>
                <div>
                    <form @submit.prevent="handleUpdate">
                        <InputLabel>Price Per Night:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required
                            v-model="formData.price_per_night" />
                        <InputLabel>Status:</InputLabel>
                        <select v-model="formData.status"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select status...</option>
                            <option value="Active">ACTIVE</option>
                            <option value="Inactive">INACTIVE</option>
                        </select>
                        <div class="flex justify-end">
                            <div>
                                <PrimaryButton>Update</PrimaryButton>
                                <DangerButton @click.prevent="showModalEdit = false">Cancel</DangerButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>

<script setup>
import DangerButton from "@/Components/DangerButton.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Modal from "@/Components/Modal.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DataTable from "@/Components/DataTable.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, computed, onMounted } from "vue"
import { router, Head, useForm, usePage } from "@inertiajs/vue3";
import useData from '@/Composables/useData'


const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const showModal = ref(false)
const showModalEdit = ref(false)
const itemId = ref('')
const selectedMotel = ref('')

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
    { label: 'PRICE PER NIGHT', key: 'price_per_night' },
    { label: 'STATUS', key: 'status' },
    { label: 'CREATED AT', key: 'created_at' },
])
const props = defineProps({
    rates: {
        type: Object,
    },
    queryLimit: Number
})
const handleSubmit = async () => {
    const result = await storeItem('rates', formData)
    if (result.success) {
        router.get(route('rates.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", error)
    }
}
const handleUpdate = async () => {
    const result = await updateItem(`rates/${itemId.value}`, formData)
    if (result.success) {
        router.get(route('rates.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('rates.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const editData = async (id) => {
    itemId.value = id
    const result = await fetchItem(`rates/${id}`)
    if (result.success) {
        formData.price_per_night = result.data.price_per_night
        formData.status = result.data.status
        showModalEdit.value = true
    } else {
        console.log(result.error)
    }

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
    router.get(route('rates.index', params))
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
    router.get(route('rates.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this rate?')) {
        router.delete(route('rates.destroy', id), {
            preserveState: true
        })
    }

}
onMounted(() => {
    console.log(props.rates)
})
</script>

<style lang="scss" scoped></style>