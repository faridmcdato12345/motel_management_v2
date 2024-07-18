<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <PrimaryButton @click.prevent="showModal = true">Create</PrimaryButton>
            <DataTable :data="props.users.data" :columns="columns" :pagination="props.users" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="true" />
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div class="">
                    <h6>Create User</h6>
                </div>
                <div>
                    <form @submit.prevent="storeMotelUser">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="userFormData.name" />
                        <InputLabel>Username:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="userFormData.username" />
                        <InputLabel>Password:</InputLabel>
                        <TextInput type="password" class="mt-1 block w-full" required v-model="userFormData.password" />
                        <InputLabel for="password_confirmation" value="Confirm Password" />
                        <TextInput id="password_confirmation" type="password" class="mt-1 block w-full"
                            v-model="userFormData.password_confirmation" required autocomplete="new-password" />
                        <InputLabel>Account for:</InputLabel>
                        <select v-model="selectedMotel"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="" disabled>-- Select a motel --</option>
                            <option v-for="motel in props.motels" :key="motel.id" :value="motel.id">{{ motel.motel_name
                                }}</option>
                        </select>
                        <InputLabel>Role:</InputLabel>
                        <select v-model="userFormData.selectedRole"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="" disabled>--Select a role --</option>
                            <option v-for="role in props.theRoles" :key="role.id" :value="role.name">{{ role.name
                                }}</option>
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
                    <h6>Edit User</h6>
                </div>
                <div>
                    <form @submit.prevent="handleUpdate">
                        <InputLabel>Name:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="userFormData.name" />
                        <InputLabel>Username:</InputLabel>
                        <TextInput type="text" class="mt-1 block w-full" required v-model="userFormData.username" />
                        <InputLabel>Account for:</InputLabel>
                        <select v-model="selectedMotel"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select a motel...</option>
                            <option v-for="motel in props.motels" :key="motel.id" :value="motel.id">{{ motel.motel_name
                                }}</option>
                        </select>
                        <InputLabel>Role:</InputLabel>
                        <select v-model="userFormData.selectedRole"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select a role...</option>
                            <option v-for="role in props.theRoles" :key="role.id" :value="role.name">{{ role.name
                                }}</option>
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

const userFormData = useForm({
    name: '',
    username: '',
    password: '',
    password_confirmation: '',
    selectedRole: '',
})
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'NAME', key: 'name' },
    { label: 'USERNAME', key: 'username' },
    { label: 'ACCOUNT FOR THE MOTEL/HOTEL', key: 'motels.0.motel_name' },
    { label: 'CREATED AT', key: 'created_at' },
])
const props = defineProps({
    users: {
        type: Object,
    },
    motels: {
        type: Object
    },
    roles: Array,
    permissions: Array,
    queryLimit: Number,
    theRoles: Object,
})
const storeMotelUser = async () => {
    const result = await storeItem(`add_motel_user/${selectedMotel.value}`, userFormData)
    if (result.success) {
        router.get(route('users.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", result.error)
    }
}
const handleUpdate = async () => {
    const result = await updateItem(`users/${itemId.value}/${selectedMotel.value}`, {
        name: userFormData.name,
        username: userFormData.username,
        selectedRole: userFormData.selectedRole
    })
    console.log("update result: ", result)
    if (result.success) {
        router.get(route('users.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('users.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const editData = async (id) => {

    itemId.value = id
    const result = await fetchItem(`users/${id}`)
    if (result.success) {
        userFormData.name = result.data.name
        userFormData.username = result.data.username
        userFormData.selectedRole = result.data.roles[0].name
        selectedMotel.value = result.data.motels[0].id
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
    console.log(props.roles)
})
</script>

<style lang="scss" scoped></style>