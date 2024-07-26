<template>
    <div class="mt-4">
        <div v-if="isMultiForm" class="multi">
            <div v-for="(formSection, index) in gptData" :key="index">
                <MultiFormSection :modelValue="formSection" v-if="step === index"
                    @update:modelValue="value => updateFormSection(value, index)"
                    :is-multi-client="isMultiClient = false" @compiledData="handleCompiledData"
                    :guest-types="guestTypes" />
            </div>
        </div>
        <div class="form" v-else>
            <FormSection :modelValue="gptData" :is-multi-client="isMultiClient" :clients="props.gptData.clients"
                @update:modelValue="value => updateFormSection(value)" :guest-types="guestTypes"
                :available-rooms="roomsAvailable" @update:selectedOption="handleSelectedOption" />
        </div>
        <div class="flex justify-between mt-4 space-x-4">
            <div v-if="step > 0" class="flex justify-center w-full bg-red-800 rounded-md">
                <Button :label="'Back'" btn-block :darken="step >= 3" class="  p-4 " color="success"
                    @click.prevent="prevStep" />
            </div>
            <div class="flex justify-center w-full bg-blue-400 rounded-md">
                <Button :label="step < props.gptData.length - 1 ? 'Next' : 'Check In'" btn-block
                    :darken="step >= props.gptData.length - 1" class="p-4" color="success" @click.prevent="nextStep" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from "./Button.vue";
import { router, useForm } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import FormSection from "./FormSection.vue";
import MultiFormSection from "@/Components/MultiFormSection.vue"
import useData from "@/Composables/useData";
import axios from "axios";

const { storeItem, fetchItem } = useData()

const props = defineProps({
    gptData: Object,
    guestTypes: Object,
    roomNumbers: Object,
    room: Object,
    reCheckIn: {
        type: Boolean,
        default: false
    }
})
const isMultiClient = ref(false)
const isMultiForm = ref(false)
const roomsAvailable = ref({})
const addedRoom = ref('')
const emit = defineEmits(['update:gptData', 'compiledData']);

const formData = useForm({
    case_number: props.gptData.case_number,
    days: props.gptData.days,
    amount: props.gptData.amount,
    self_pay: props.gptData.contribution,
    guest_name: props.gptData.clients,
    room_number: '',

})
const handleSelectedOption = (selectedValue) => {
    console.log('Selected option:', selectedValue);
    addedRoom.value = selectedValue
    props.gptData.added_room = selectedValue
    console.log("'handleSelectedOption':", props.gptData)
};
const step = ref(0)
const nextStep = async () => {
    if (step.value == props.gptData.length - 1) {
        emit('compiledData', props.gptData);
        if (props.reCheckIn) {
            await axios.patch(route('re_check_in.upload', props.room.id), {
                check_in_date: props.gptData.check_in,
                check_out_date: props.gptData.check_out,
            })
        }
        const result = await storeItem(`/guest/store/multi_client/${props.room.id}`, props.gptData)
        if (result.success) {
        } else {
            return
        }
    }
    if (props.gptData.length > 1) {
        step.value++
    }
    if (props.gptData.length = 'undefined') {
        console.log("props.gptData: ", props.gptData)
        emit('compiledData', props.gptData);
        if (props.reCheckIn) {
            await axios.patch(route('re_check_in.upload', props.room.id), {
                check_in_date: props.gptData.check_in,
                check_out_date: props.gptData.check_out,
            })
        }
        const result = await storeItem(`/store/multi_client/voucher/${props.room.id}`, props.gptData)
        if (result.success) {
            router.get(route('user.home'))
        } else {
            return
        }

    }

    if (step.value < props.gptData.length) {
        console.log("clients: ", props.gptData)
        step.value++
    }
}
const prevStep = () => {
    step.value--
}

const updateFormSection = (value, index) => {
    const updatedData = [...props.gptData];
    updatedData[index] = value;
    emit('update:gptData', updatedData);
};
const compileAllData = () => {
    emit('compiledData', props.gptData);
};

const getAvailableRooms = async () => {
    const result = await axios.get(route('rooms.available')).then((response) => {
        roomsAvailable.value = response.data
    })
}
onMounted(() => {
    console.log("roomNumbers guestde: ", props.roomNumbers)
    if (props.gptData.length > 1) {
        isMultiForm.value = true
    } else if (props.gptData.clients.length > 1) {
        isMultiClient.value = true
    }
    getAvailableRooms()
})
</script>


<style lang="scss" scoped></style>