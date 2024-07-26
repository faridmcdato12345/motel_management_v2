<template>
    <div>
        <div>
            <InputLabel>Guest Name/s:</InputLabel>
            <TextInput v-if="!isMultiClient" type="text" class="mt-1 block w-full one" required
                v-model="localFormData.clients" />
            <MultInputText v-else v-model="localFormData.clients" class="multiple" />
        </div>
        <!-- <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Guest/s Age Group:</InputLabel>
            <div v-for="(client, index) in localFormData.clients" :key="index" class="text-nowrap items-center py-2">
                <p>{{ client }}:</p>
                <select v-model="localFormData.type[index]" class="mt-1 block w-full">
                    <option value="">-- Select guest age group --</option>
                    <option :value="type.id" v-for="type in guestTypes" :key="type.id">{{ type.name }}</option>
                </select>
            </div>
        </div> -->
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Case Number:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.case_number" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Days:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.days" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Check In Date:</InputLabel>
            <TextInput type="date" class="mt-1 block w-full" required v-model="localFormData.check_in" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Check Out Date:</InputLabel>
            <TextInput type="date" class="mt-1 block w-full" required v-model="localFormData.check_out" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <div class="flex space-x-4 items-center">
                <InputLabel>Get Another Room?</InputLabel>
                <input type="checkbox" v-model="isChecked" />
                <p>Yes</p>
            </div>
            <div v-if="isChecked" class="mt-4">
                <InputLabel>Available Rooms:</InputLabel>
                <select class="w-full block" v-model="selectedOption" @change="emitSelectedOption">
                    <option value="">-- Select Room -- </option>
                    <option :value="room.id" v-for="room in availableRooms" :key="room.id">{{ room.room_number }}
                    </option>
                </select>
            </div>

        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Rate Amount:</InputLabel>
            <TextInput type="number" class="mt-1 block w-full" required v-model="localFormData.rate_amount" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Voucher Amount:</InputLabel>
            <TextInput type="number" class="mt-1 block w-full" required v-model="localFormData.total" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Self Pay:</InputLabel>
            <TextInput type="number" class="mt-1 block w-full" required v-model="localFormData.self_pay" />
        </div>
    </div>
    <Modal :show="modalAlert">
        <div class="p-8">
            <div>
                <p class="text-2xl font-black">The scanned/uploaded voucher was expired.</p>
                <p class="text-2xl font-black">Would you like to continue?</p>

                <div class="flex w-full space-x-2 mt-4">
                    <button class="bg-green-200 p-4 rounded-md w-full" @click.prevent="modalAlert = false">YES</button>
                    <Link :href="route('user.home')" class="bg-rose-400 p-4 rounded w-full text-center">NO</Link>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import { defineProps, defineEmits, computed, onMounted, ref, watch } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import MultInputText from './MultInputText.vue';
import Modal from './Modal.vue';
import { Link } from '@inertiajs/vue3';
import { useCalculateRate } from '@/Composables/useCalculateRate';
import { useGetRate } from '@/Composables/useGetRate';

const { calculate, daysDifference } = useCalculateRate()
const { rate } = useGetRate()

const props = defineProps({
    isMultiClient: Boolean,
    modelValue: Object,
    guestTypes: Object,
    availableRooms: Object
    // roomNumbers: Object,
})
const selectedOption = ref('');
const isChecked = ref(false);
const modalAlert = ref(false)
const emit = defineEmits(['update:modelValue', 'update:selectedOption']);

const emitSelectedOption = () => {
    emit('update:selectedOption', selectedOption.value);
};

const localFormData = computed({
    get() {
        return props.modelValue || {};
    },
    set(value) {
        emit('update:modelValue', value);
    }
});
const calculateDaysDifference = () => {
    const checkInDate = new Date(localFormData.value.check_in);
    const checkOutDate = new Date(localFormData.value.check_out);
    const differenceInTime = checkOutDate - checkInDate;
    const differenceInDays = (differenceInTime / (1000 * 3600 * 24)) + 1; // Convert milliseconds to days
    localFormData.value.days = differenceInDays >= 0 ? differenceInDays : 0; // Ensure days are non-negative
    const r = rate(1, "shared", differenceInDays >= 0 ? differenceInDays : 0)
    console.log("rate: ", r)
    localFormData.value.rate_amount = r;
};
watch(() => localFormData.value.check_in, calculateDaysDifference);
watch(() => localFormData.value.check_out, calculateDaysDifference);

onMounted(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    if (formattedDate > props.modelValue.check_in || formattedDate > props.modelValue.check_out) {
        modalAlert.value = true
    }
});
</script>
