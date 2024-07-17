<template>
    <div>
        <div>
            <InputLabel>Guest Name/s:</InputLabel>
            <TextInput v-if="!isMultiClient" type="text" class="mt-1 block w-full one" required
                v-model="localFormData.clients" />
            <MultInputText v-else v-model="localFormData.clients" class="multiple" />
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Guest/s Age Group:</InputLabel>
            <div v-for="(client, index) in localFormData.clients" :key="index" class="text-nowrap items-center py-2">
                <p>{{ client }}:</p>
                <select v-model="localFormData.type[index]" class="mt-1 block w-full">
                    <option value="">-- Select guest age group --</option>
                    <option :value="type.id" v-for="type in guestTypes" :key="type.id">{{ type.name }}</option>
                </select>
            </div>
        </div>
        <hr class="mt-4 mb-4">
        <div>
            <InputLabel>Room Number:</InputLabel>
            <select v-if="roomNumbers.length" v-model="localFormData.room_number" class="mt-1 block w-full">
                <option value="">{{ roomNumbers.length ? '-- Select room --' : 'No Room Available' }}</option>
                <option :value="room.id" v-for="room in roomNumbers" :key="room.id">{{ room.room_number }}</option>
            </select>
            <div v-else class="border-red-400 border-2 p-4 rounded-md">No Room Available</div>
        </div>
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
            <InputLabel>Amount:</InputLabel>
            <TextInput type="text" class="mt-1 block w-full" required v-model="localFormData.total" />
        </div>
        <hr class="mt-4 mb-4">
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
    modelValue: Object,
    guestTypes: Object,
    roomNumbers: Object,
})

const emit = defineEmits(['update:modelValue']);

const localFormData = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

onMounted(() => console.log(localFormData));
</script>
