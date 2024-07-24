<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <DataTable :data="props.vouchers.data" :columns="columns" :pagination="props.vouchers"
                @limit-query="limitQuery" @search-field-query="searchFieldQuery" @delete="deleteData" @edit="editData"
                :query-limit="props.queryLimit" :route-create="createRoute" :query-name="props.queryName" :action="true"
                :placeholder="placeholder" />
        </div>
        <Modal :show="showModalEdit" @close="showModalEdit = false">
            <div class="p-4">
                <div class="">
                    <h6>Edit Guest Type</h6>
                </div>
                <div>
                    <form>
                        <div class="flex w-full space-x-4">
                            <div class="w-full">
                                <img :src="formData.path" alt="" class="w-full h-full">
                            </div>
                            <div class="w-full">
                                <InputLabel>Motel Name:</InputLabel>
                                <TextInput type="text" class="mt-1 block w-full" required v-model="formData.motels"
                                    readonly />
                                <InputLabel>Guest/Client:</InputLabel>
                                <TextInput type="text" class="mt-1 block w-full" required v-model="formData.guests"
                                    readonly />
                                <InputLabel>Case Number:</InputLabel>
                                <TextInput type="text" class="mt-1 block w-full" required
                                    v-model="formData.case_number" />
                                <InputLabel>Number of Days:</InputLabel>
                                <TextInput type="number" class="mt-1 block w-full" required v-model="formData.days" />
                                <InputLabel>Amount:</InputLabel>
                                <TextInput type="number" class="mt-1 block w-full" required v-model="formData.amount" />
                                <InputLabel>Self Pay:</InputLabel>
                                <TextInput type="number" class="mt-1 block w-full" required
                                    v-model="formData.self_pay" />
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <div class="flex space-x-2">
                                <PrimaryButton @click.prevent="handleUpdate">Update</PrimaryButton>
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
import Modal from "@/Components/Modal.vue";
import DataTable from "@/Components/DataTable.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, computed, onMounted } from "vue"
import { router, Head, useForm, usePage } from "@inertiajs/vue3";
import useData from '@/Composables/useData'
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";


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
    guests: '',
    amount: '',
    case_number: '',
    days: '',
    motels: '',
    path: '',
})
const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'MOTEL', key: 'motel.motel_name' },
    { label: 'GUEST', key: 'guest.full_name' },
    { label: 'CASE NUMBER', key: 'case_number' },
    { label: 'NUMBER OF DAYS', key: 'days' },
    { label: 'AMOUNT', key: 'amount' },
    { label: 'SELF PAY', key: 'self_pay' },
    { label: 'PATH', key: 'path' },
    { label: 'CREATED AT', key: 'created_at' }
])
const props = defineProps({
    vouchers: {
        type: Object,
    },
    queryLimit: Number
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
const editData = async (id) => {
    itemId.value = id
    console.log(route('vouchers.update', itemId.value))
    await axios.get(`/vouchers/${id}`)
        .then((result) => {
            console.log(result)
            formData.guests = result.data.guests.first_name
            formData.amount = result.data.amount
            formData.case_number = result.data.case_number
            formData.days = result.data.days
            formData.motels = result.data.motels.motel_name
            formData.path = result.data.path
            formData.self_pay = result.data.self_pay
            showModalEdit.value = true
        }).catch((error) => {
            console.log(error)
        })
}
const handleUpdate = async () => {
    const result = await updateItem(`vouchers/${itemId.value}`, formData)
    if (result.success) {
        router.get(route('all.vouchers'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log("update success")
    } else {
        router.get(route('all.vouchers'), {
            preserveState: true,
            preserveScroll: true
        })
        console.log(result.error)
    }
}
const deleteData = (id) => {
    if (confirm('Are you sure you want to delete this voucher?')) {
        router.delete(route('vouchers.destroy', id), {
            preserveState: true
        })
    }
}
onMounted(() => {
    console.log(props.vouchers)
})
</script>

<style lang="scss" scoped></style>