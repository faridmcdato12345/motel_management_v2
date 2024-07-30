<template>

    <Head title="Payments" />

    <AuthenticatedLayout>
        <div class="pl-12 pr-4 py-4">
            <!-- <button class="bg-sky-200 p-4 rounded-md" @click.prevent="showVoucher">Add Payment</button> -->
            <div>
                <input type="text" class="w-full text-lg" v-model="searchText"
                    placeholder="Search for Voucher Case Number..">
                <table class="table-auto w-full border border-gray-950 mt-4 rounded h-24">
                    <thead class="border border-gray-950">
                        <th></th>
                        <th>CASE NUMBER</th>
                        <th>DAY/S</th>
                        <th>VOUCHER AMOUNT</th>
                        <th>PAID TOTAL AMOUNT</th>
                        <th>BALANCE</th>
                        <th>PAYMENT STATUS</th>
                        <th>CHECKED IN</th>
                        <th>CHECKED OUT</th>
                        <th>ACTION</th>
                    </thead>
                    <tbody>
                        <tr v-for="result in searchResults" :key="result.id"
                            class="text-center hover:bg-gray-400 cursor-pointer">
                            <td>
                                <input type="checkbox" v-model="result.isChecked">
                            </td>
                            <td>{{ result.case_number }}</td>
                            <td>{{ result.days }}</td>
                            <td>
                                <template v-if="result.isChecked">
                                    <input type="text" v-model="result.amount" class="text-center"
                                        @keyup.enter="updateAmount(result)">
                                </template>
                                <template v-else>
                                    {{ result.amount }}
                                </template>
                            </td>

                            <td>{{ result.payment ? totalAmountPaid(result) : 0 }}</td>
                            <td>{{ result.balance }}</td>
                            <td>{{
                                result.payment ? result.payment[0].status
                                    : "" }}</td>
                            <td>{{ result.guest ? result.guest.bookings.check_in_date : '' }}</td>
                            <td>{{ result.guest ? result.guest.bookings.check_out_date : '' }}</td>
                            <td><button class="bg-sky-200 p-4 rounded-md" @click.prevent="addPayment(result.id)"
                                    v-if="result.payment[0].status === 'Balance'">Add
                                    Payment</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Modal :show="showModal" @close="showModal = false">
            <div class="p-4">
                <div>
                    <form @submit.prevent="storePayment">
                        <InputLabel>Payment:</InputLabel>
                        <TextInput type="number" class="mt-1 block w-full" required v-model="payment" />
                        <div class="flex justify-end space-x-2 mt-4">
                            <PrimaryButton>Create</PrimaryButton>
                            <DangerButton @click.prevent="showModal = false">Cancel</DangerButton>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    </AuthenticatedLayout>
</template>

<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import DangerButton from "@/Components/DangerButton.vue";
import Modal from "@/Components/Modal.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, computed, onMounted, watch } from "vue"
import { router, Head, useForm, usePage } from "@inertiajs/vue3";
import useData from '@/Composables/useData'
import axios from 'axios';


const { isLoading, error, storeItem, fetchItem, updateItem } = useData()
const showModal = ref(false)
const showModalEdit = ref(false)
const itemId = ref('')
const payment = ref('')
const selectedMotel = ref('')
const showField = ref(false)
const searchText = ref('')
const searchResults = ref([])
const voucherId = ref('')

const page = usePage();
const userRoles = computed(() => page.props.userRoles);
const userPermissions = computed(() => page.props.userPermissions);

const columns = ref([
    { label: 'ID', key: 'id' },
    { label: 'CASE NUMBER', key: 'case_number' },
    { label: 'DAYS', key: 'days' },
    { label: 'VOUCHER AMOUNT', key: 'amount' },
    { label: 'RATE AMOUNT', key: 'rate_amount' },
    { label: 'SELF PAY', key: 'self_pay' },
    { label: 'BALANCE', key: 'balance' },
    { label: 'MOTEL', key: 'motel.motel_name' },
    { label: 'CREATED AT', key: 'created_at' },
    { label: 'PAYMENT STATUS', key: 'payment.status' },
])
const props = defineProps({
    users: {
        type: Object,
    },
    vouchers: {
        type: Object
    },
    roles: Array,
    permissions: Array,
    queryLimit: Number,
    theRoles: Object,
})

const showVoucher = () => {
    showField.value = !showField.value
}

const storePayment = () => {
    const newFormData = useForm({
        payment: payment.value,
        id: voucherId.value
    })
    newFormData.post(route('payments.store'), {
        preserveState: true,
        onSuccess: () => {

        }
    })
    result.payment.paid_amount = newFormData.payment
    result.balance = result.amount - result.payment.paid_amount
    result.payment.status = result.balance == 0 ? 'Paid' : 'Balance'
    showModal.value = false

}
const fetchSearchResults = async (query) => {
    if (query) {
        try {
            await axios.get(route('search.case_number'), { params: { case_number: query } })
                .then((response) => {
                    console.log(response.data)
                    if (response.data) {
                        searchResults.value = response.data.map(result => ({ ...result, isChecked: false }));
                    } else {
                        searchResults.value = "Case number not found";
                    }

                })
                .catch((error) => console.log(error))


        } catch (error) {
            console.error('Error fetching search results:', error)
        }
    } else {
        searchResults.value = []
    }
}
// Method to update amount in the database
const updateAmount = (result) => {
    try {
        const formData = useForm({
            amount: result.amount
        })
        formData.patch(route('update.voucher.amount', result.id), formData, {
            preserveState: false,
            onSuccess: () => {

                console.log("update success")

            }

        })
        result.isChecked = false
        result.amount = formData.amount
        result.balance = result.amount - result.payment.paid_amount
        console.log('Amount updated successfully');
    } catch (error) {
        console.error('Error updating amount:', error);
    }
};
const totalAmountPaid = (result) => {
    console.log(result)
    const totalPaidAmount = result.payment.reduce((acc, payment) => {
        return acc + parseFloat(payment.paid_amount);
    }, 0);

    return totalPaidAmount
}
const totalStatus = (result) => {
    const status = Object.keys(result).map(key => {
        return result[key].payment.status
    })
    return status
}
const addPayment = (id) => {
    voucherId.value = id
    showModal.value = true
}
const limitQuery = (name, e) => {
    let qParams = {}
    let nParams = {}
    let params = {}
    if (props.queryName) {
        nParams['case_number'] = props.queryName
        qParams[name] = e

        params = { ...qParams, ...nParams }
    } else if (!props.queryName) {
        qParams[name] = e
        params = qParams
    } else {
        delete qParams[name]
        delete nParams['case_number']
    }
    router.get(route('payments.index', params))
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
        delete nParams['case_number']
    }
    router.get(route('payments.index', params))
}

watch(searchText, (newValue) => {
    console.log(newValue)
    fetchSearchResults(newValue)
})
</script>

<style lang="scss" scoped></style>