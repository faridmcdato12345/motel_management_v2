<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <PrimaryButton @click.prevent="showModal = true" v-if="permissions.includes('create motel')">Create
            </PrimaryButton>
            <DataTable :data="props.motels.data" :columns="columns" :pagination="props.motels" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData" @addUser="showModalAddUser"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName" :action="true"
                :addUser="true" />
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div class="">
                    <h6>Create Motel/Hotel</h6>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.motel_name" />
                        <InputLabel>Address:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.motel_address" />
                        <InputLabel>Phone Number:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.phone_number" />
                        <InputLabel>Email Address:</InputLabel>
                        <TextInput type="email" class="mt-1 block w-full" required v-model="formData.email_address" />
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
                    <h6>Edit Motel</h6>
                </div>
                <div>
                    <form @submit.prevent="handleUpdate">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.motel_name" />
                        <InputLabel>Address:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.motel_address" />
                        <InputLabel>Phone Number:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="formData.phone_number" />
                        <InputLabel>Email Address:</InputLabel>
                        <TextInput type="email" class="mt-1 block w-full" required v-model="formData.email_address" />
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
        <Modal :show="modalAddUser" @close="modalAddUser = false">
            <div class="p-4">
                <div class="">
                    <h6>Edit Motel</h6>
                </div>
                <div>
                    <form @submit.prevent="storeMotelUser">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="userFormData.name" />
                        <InputLabel>Email Address:</InputLabel>
                        <TextInput type="email" class="mt-1 block w-full" required v-model="userFormData.email" />
                        <InputLabel>Password:</InputLabel>
                        <TextInput type="password" class="mt-1 block w-full" required v-model="userFormData.password" />
                        <InputLabel for="password_confirmation" value="Confirm Password" />
                        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full"
                            v-model="userFormData.password_confirmation" required autocomplete="new-password" />
                        <div class="flex justify-end">
                            <div>
                                <PrimaryButton>Create</PrimaryButton>
                                <DangerButton @click.prevent="modalAddUser = false">Cancel</DangerButton>
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
import { onMounted, ref, computed } from "vue"
import { router, Head, useForm, usePage } from "@inertiajs/vue3";
import useData from '@/Composables/useData'


const { isLoading, error, storeItem, fetchItem, updateItem, addMotelUser } = useData()
const showModal = ref(false)
const showModalEdit = ref(false)
const modalAddUser = ref(false)
const itemId = ref('')
const motelId = ref()

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
    motel_name: '',
    motel_address: '',
    phone_number: '',
    email_address: '',
    status: ''
})

const userFormData = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'NAME', key: 'motel_name' },
    { label: 'ADDRESS', key: 'motel_address' },
    { label: 'PHONE NUMBER', key: 'phone_number' },
    { label: 'EMAIL ADDRESS', key: 'email_address' },
    { label: 'STATUS', key: 'status' },
    { label: 'CREATED AT', key: 'created_at' },
])


const props = defineProps({
    motels: {
        type: Object,
    },
    roles: Array,
    permissions: Array,
    queryLimit: Number
})
const showModalAddUser = (id) => {
    console.log("add motel user")
    motelId.value = id
    modalAddUser.value = !modalAddUser.value
}
const storeMotelUser = async () => {
    const result = await storeItem(`add_motel_user/${motelId.value}`, userFormData)
    if (result.success) {
        router.get(route('motel.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", result.error)
    }
}
const handleSubmit = async () => {
    const result = await storeItem('motel', formData)
    if (result.success) {
        router.get(route('motel.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", error)
    }
}
const handleUpdate = async () => {
    const result = await updateItem(`motel/${itemId.value}`, formData)
    if (result.success) {
        router.get(route('motel.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('motel.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const editData = async (id) => {
    itemId.value = id
    const result = await fetchItem(`motel/${id}`)
    if (result.success) {
        formData.motel_name = result.data.motel_name
        formData.status = result.data.status
        formData.motel_address = result.data.motel_address
        formData.phone_number = result.data.phone_number
        formData.email_address = result.data.email_address
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
    router.get(route('motel.index', params))
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
    router.get(route('motel.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this motel?')) {
        router.delete(route('motel.destroy', id), {
            preserveState: true
        })
    }

}
onMounted(() => {
    console.log(props.roles)
})
</script>

<style lang="scss" scoped></style>