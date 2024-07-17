<template>
    <div class="relative py-2">
        <div class="flex flex-wrap gap-2 mb-2">
            <div v-for="(client, index) in clients" :key="index"
                class="flex bg-gray-200 rounded-md text-nowrap w-full min-w-40 max-w-44 relative ">
                <div @click.prevent="editName(client, index)" class="cursor-pointer p-2 bg-blue-400">
                    <span class="text-white">{{ client }}</span>
                </div>
                <div @click="removeClient(index)"
                    class="hover:cursor-pointer flex items-center justify-center hover:text-red-700 dark:bg-red-800 bg-red-800 w-full hover:bg-red-400">
                    <p class="text-xl text-white">x</p>
                </div>
            </div>
        </div>
        <div class="relative">
            <input v-model="newName" @keyup.enter="addClient" placeholder="Enter Guest Name ..." type="text"
                class="w-full py-2 border border-gray-300 rounded" />
            <PrimaryButton class="absolute right-2 top-1" @click.prevent="addClient" v-if="isVisible">Add
            </PrimaryButton>
            <PrimaryButton class="absolute right-2 top-1" @click.prevent="updateNameClient" v-else>
                Update
            </PrimaryButton>
        </div>

    </div>
</template>

<script setup>
import PrimaryButton from './PrimaryButton.vue';
import { ref, computed, watch } from 'vue';

const clientIndex = ref('')
const isVisible = ref(true)
const newName = ref('');
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['update:modelValue'])

const clients = computed(() => props.modelValue)

// Debugging: watch the clients array to ensure it's correctly updated
watch(clients, (newClients) => {
    console.log('Clients updated:', newClients);
});

const addClient = () => {
    if (newName.value) {
        const newClient = newName.value  // Set default type or leave it empty
        emit('update:modelValue', [...clients.value, newClient])
        newName.value = '';
    }
};

const removeClient = (index) => {
    const newClients = [...clients.value]
    newClients.splice(index, 1)
    emit('update:modelValue', newClients);
};
const editName = (client, index) => {
    console.log(clients[0])
    clientIndex.value = index
    newName.value = client
    isVisible.value = false
}
const updateNameClient = () => {
    const newClients = [...clients.value]
    newClients[clientIndex.value] = newName.value
    newName.value = ''
    emit('update:modelValue', newClients)
    isVisible.value = true
}
</script>

<style>
/* You can add custom styles here if needed */
</style>