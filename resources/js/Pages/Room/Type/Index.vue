<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <PrimaryButton @click.prevent="showModal = true">Create</PrimaryButton>
            <DataTable :data="props.types.data" :columns="columns" :pagination="props.types" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="true" />
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div class="">
                    <h6>Create Room Type</h6>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.name" />
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
                    <h6>Edit Room Type</h6>
                </div>
                <div>
                    <form @submit.prevent="handleUpdate">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.name" />
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
import { onMounted, ref } from "vue"
import { router, Head, useForm } from "@inertiajs/vue3";
import useData from '@/Composables/useData'


const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const showModal = ref(false)
const showModalEdit = ref(false)
const itemId = ref('')
const formFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        select: false
    },

];
const formData = useForm({
    name: '',
    status: ''
})
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'NAME', key: 'name' },
    { label: 'CREATED AT', key: 'created_at' },
])


const props = defineProps({
    types: {
        type: Object,
    }
})
const handleSubmit = async () => {
    const result = await storeItem('room_type', formData)
    if (result.success) {
        router.get(route('room_type.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", error)
    }
}
const handleUpdate = async () => {
    const result = await updateItem(`room_type/${itemId.value}`, formData)
    if (result.success) {
        router.get(route('room_type.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('room_type.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const editData = async (id) => {
    itemId.value = id
    const result = await fetchItem(`room_type/${id}`)
    if (result.success) {
        formData.name = result.data.name
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
    router.get(route('room_type.index', params))
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
    router.get(route('room_type.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this type?')) {
        router.delete(route('room_type.destroy', id), {
            preserveState: true
        })
    }

}
onMounted(() => {
    console.log(props.types)
})
</script>

<style lang="scss" scoped></style>