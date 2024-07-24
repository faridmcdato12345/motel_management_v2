<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <PrimaryButton @click.prevent="showModal = true">Create</PrimaryButton>
            <DataTable :data="props.rooms.data" :columns="columns" :pagination="props.rooms" @limit-query="limitQuery"
                @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName"
                :action="true" />
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div class="">
                    <h6>Create Room</h6>
                </div>
                <div>
                    <form @submit.prevent="handleSubmit">
                        <InputLabel class="mt-4">Room Number:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required v-model="formData.room_number" />
                        <InputLabel class="mt-4">Maximum Capacity:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required
                            v-model="formData.maximum_capacity" />
                        <div class="flex items-center mt-4 space-x-2">
                            <InputLabel>Sharable?</InputLabel>
                            <div>
                                <input type="checkbox" id="checkbox" v-model="formData.is_shared" />
                            </div>
                        </div>
                        <InputLabel class="mt-4">Type:</InputLabel>
                        <select v-model="formData.room_type_id"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select room type...</option>
                            <option v-for="type in props.roomTypes" :key="type.id" :value="type.id">{{ type.name }}
                            </option>
                        </select>
                        <InputLabel class="mt-4">Rate:</InputLabel>
                        <select v-model="formData.rate_id"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select rate...</option>
                            <option v-for="rate in props.rates" :key="rate.id" :value="rate.id">{{ rate.price_per_night
                                }}
                            </option>
                        </select>
                        <div class="flex justify-end mt-4">
                            <div class="flex space-x-2">
                                <PrimaryButton>Create</PrimaryButton>
                                <DangerButton @click.prevent="closeModal">Cancel</DangerButton>
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
                    <form @submit.prevent="handleSubmit">
                        <InputLabel class="mt-4">Room Number:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required v-model="formData.room_number" />
                        <InputLabel class="mt-4">Maximum Capacity:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required
                            v-model="formData.maximum_capacity" />
                        <div class="flex items-center mt-4 space-x-2">
                            <InputLabel>Sharable?</InputLabel>
                            <div>
                                <input type="checkbox" id="checkbox" v-model="formData.is_shared" />
                            </div>
                        </div>
                        <InputLabel class="mt-4">Type:</InputLabel>
                        <select v-model="formData.room_type_id"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select room type...</option>
                            <option v-for="type in props.roomTypes" :key="type.id" :value="type.id">{{ type.name }}
                            </option>
                        </select>
                        <InputLabel class="mt-4">Rate:</InputLabel>
                        <select v-model="formData.rate_id"
                            class="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                            <option value="">select rate...</option>
                            <option v-for="rate in props.rates" :key="rate.id" :value="rate.id">{{ rate.price_per_night
                                }}
                            </option>
                        </select>
                        <div class="flex justify-end mt-4">
                            <div class="flex space-x-2">
                                <PrimaryButton>Create</PrimaryButton>
                                <DangerButton @click.prevent="closeModal">Cancel</DangerButton>
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
    room_number: '',
    is_occupied: 0,
    room_type_id: '',
    rate_id: '',
    maximum_capacity: '',
    is_shared: 0,
    status: 'Available'
})
const closeModal = () => {
    formData.reset()
    showModalEdit.value = false
    showModal.value = false
}
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'ROOM NUMBER', key: 'room_number' },
    { label: 'ROOM TYPE', key: 'types.name' },
    { label: 'RATE', key: 'rates.price_per_night' },
    { label: 'STATUS', key: 'status' },
])
const props = defineProps({
    rooms: {
        type: Object,
    },
    roomTypes: {
        type: Object
    },
    rates: {
        types: Object
    },
    queryLimit: Number
})
const handleSubmit = async () => {
    const result = await storeItem('rooms', formData)
    if (result.success) {
        router.get(route('rooms.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("success storing")
    } else {
        console.log("error storing: ", error)
    }
}
const handleUpdate = async () => {
    const result = await updateItem(`rooms/${itemId.value}`, formData)
    if (result.success) {
        router.get(route('rooms.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('rooms.index'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const editData = async (id) => {
    itemId.value = id
    const result = await fetchItem(`rooms/${id}`)
    console.log(result)
    if (result.success) {
        formData.room_number = result.data.room_number
        formData.is_occupied = result.data.is_occupied
        formData.room_type_id = result.data.types.id
        formData.rate_id = result.data.rates.id
        formData.maximum_capacity = result.data.maximum_capacity
        formData.is_shared = result.data.is_shared
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
    router.get(route('rooms.index', params))
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
    router.get(route('rooms.index', params))
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this room?')) {
        router.delete(route('rooms.destroy', id), {
            preserveState: true
        })
    }

}
onMounted(() => {
    console.log(props.rooms)
    console.log(props.roomTypes)
    console.log(props.rates)
})
</script>

<style lang="scss" scoped></style>