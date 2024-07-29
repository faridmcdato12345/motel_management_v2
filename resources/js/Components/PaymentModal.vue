<template>
    <Modal :show="showModal" @close="showModal = false">
        <div class="p-4">
            <div>
                <form @submit.prevent="storePayment">
                    <InputLabel>Payment:</InputLabel>
                    <TextInput type="number" class="mt-1 block w-full" required v-model="formData.payment" />
                    <div class="flex justify-end space-x-2 mt-4">
                        <PrimaryButton>Create</PrimaryButton>
                        <DangerButton @click.prevent="showModal = false">Cancel</DangerButton>
                    </div>
                </form>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import PrimaryButton from './PrimaryButton.vue';
import DangerButton from './DangerButton.vue';
import { ref } from 'vue';
import Modal from './Modal.vue';
import InputLabel from './InputLabel.vue';
import TextInput from './TextInput.vue';
import { useForm } from '@inertiajs/vue3';


const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    },
    voucherId: Number
})
const formData = useForm({
    payment: '',
    id: props.voucherId
})
const storePayment = () => {
    formData.post(route('payments.store'), {
        onSuccess: () => {
            console.log("store success")
        }
    })
}
</script>

<style lang="scss" scoped></style>