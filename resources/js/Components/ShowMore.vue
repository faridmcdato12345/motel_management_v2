<template>
    <div>
        <Modal :show="modalIsSharable">
            <div class="p-4">
                <table class="w-full text-center table-auto">
                    <thead>
                        <th>Check In Date</th>
                        <th>Check Out Date</th>
                        <th>Voucher Status</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr v-for="data in roomBookingDetails" :key="data.id" :class="classesRow(data.check_out_date)"
                            class="border border-white">
                            <td>{{ formatDate(data.check_in_date) }}</td>
                            <td>{{ formatDate(data.check_out_date) }}</td>
                            <td>{{ getVoucherStatus(data.check_out_date) }}</td>
                            <td class="space-x-2">
                                <button class="bg-green-200 p-2 rounded-md" @click.prevent="$emit('recheckIn')">Re-check
                                    In</button>
                                <button class="bg-rose-400 p-2 rounded-md" @click.prevent="checkoutModal(data.id)">Check
                                    Out</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
        <Modal :show="showCheckoutModal">
            <div class="p-4">
                <div>
                    <label for="" class="text-lg font-black">Check Out Date:</label>
                    <input type="date" v-model="checkOutdate" class="w-full mt-4">
                </div>
                <div class="mt-4 flex w-full space-x-2">
                    <button class="bg-green-200 p-2 rounded-md w-full" @click.prevent="checkOut">Check
                        Out</button>
                    <button class="bg-rose-400 p-2 rounded-md w-full"
                        @click.prevent="showCheckoutModal = false">Back</button>
                </div>
            </div>

        </Modal>
    </div>
</template>

<script setup>
import { router, useForm } from '@inertiajs/vue3';
import { computed, defineProps, onMounted, ref } from 'vue';
import Modal from './Modal.vue';


const props = defineProps({
    modalIsSharable: Boolean,
    room: Number,
    roomBookingDetails: Object
})
const emit = defineEmits(['closeShowMore'])

const showCheckoutModal = ref(false)
const responseData = ref([])
const checkOutdate = ref('')
const bookId = ref(0)
const getVoucherStatus = (checkOutDate) => {
    const currentDate = new Date()
    const dueDate = new Date(checkOutDate)
    const startOfDayDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const startOfDayCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    if (startOfDayCurrentDate > startOfDayDueDate) {
        return 'Overdue'
    } else if (startOfDayCurrentDate === startOfDayDueDate) {
        return 'Due'
    } else {
        return 'Active'
    }
}
const formatDate = (date) => {
    const newDate = new Date(date)
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('en-US', option)
}
const classesRow = (date) => {
    return {
        'bg-rose-300': getVoucherStatus(date) === 'Due',
        'bg-rose-300': getVoucherStatus(date) === 'Overdue',
        'bg-blue-200': getVoucherStatus(date) === 'Active',
    }
}
const checkoutModal = (id) => {
    bookId.value = id
    showCheckoutModal.value = true
}
const checkOut = () => {
    const formData = useForm({
        manual_check_out: checkOutdate.value,
        status: 'checked_out',
        room_id: props.room
    })
    formData.patch(route('bookings.update', bookId.value), formData, {
        preserveState: true,
        onSuccess: () => {

            router.get(route('user.home'))
        }

    })
    showCheckoutModal.value = false
    emit('closeShowMore')
}
</script>

<style lang="scss" scoped></style>