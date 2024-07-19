<template>
    <div>
        <div>
            <InputLabel>Guest Name/s:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.client" />
        </div>
        <div>
            <InputLabel>Guest Type:</InputLabel>
            <select name="" id="" v-model="localFormData.type" class="mt-1 block w-full">
                <option value="">-- Select guest type --</option>
                <option :value="type.id" v-for="type in guestTypes" :key="type.id">{{ type.name }}</option>
            </select>
        </div>
        <!-- <div>
            <InputLabel>Room Number:</InputLabel>
            <select name="" id="" v-model="localFormData.room_number" class="mt-1 block w-full">
                <option value="">-- Select room --</option>
                <option :value="room.id" v-for="room in roomNumbers" :key="room.id">{{ room.room_number }}</option>
            </select>
        </div> -->
        <div>
            <InputLabel>Case Number:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.case_number" />
        </div>
        <div>
            <InputLabel>Days:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.days" />
        </div>
        <div>
            <InputLabel>Amount:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.amount" />
        </div>
        <div>
            <InputLabel>Self Pay:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.self_pay" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, onMounted } from 'vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import MultInputText from './MultInputText.vue';

const props = defineProps({
    isMultiClient: Boolean,
    guestTypes: Object,
    clients: Array,
    modelValue: Object
});
const emit = defineEmits(['update:modelValue', 'compiledData']);

const localFormData = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});
onMounted(() => console.log(props.modelValue))
</script>