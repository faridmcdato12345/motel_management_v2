<template>

    <Head title="Scan" />
    <AuthenticatedLayout>
        <Transition appear>
            <div class="flex items-center justify-center h-screen md:content-area">
                <div class="w-full h-screen relative">
                    <Scan v-if="step == 1" @update-data="getOpenAiResponse" />
                    <GuestDetail v-if="step == 2" :gptData="openAiData" @update:gptData="getUpdatedData"
                        :guest-types="guestTypes" :room="room" />
                </div>
            </div>
        </Transition>
    </AuthenticatedLayout>
</template>

<script setup>
import GuestDetail from "@/Components/GuestDetail.vue"
import Scan from "@/Components/Scan.vue"
import NavBottom from "@/Components/NavBottom.vue"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";


import { ref, onMounted } from 'vue';

const props = defineProps({
    guestTypes: Object,
    room: Object
})
const openAiData = ref({})
const getOpenAiResponse = (result) => {
    console.log("getOpenAiResponse: ", result)
    openAiData.value = result
    step.value++
}

const step = ref(1)
const getUpdatedData = (result) => {
    console.log("getUpdatedData: ", result)
}
onMounted(() => {
    console.log("roomNumbers: ", props.roomNumbers)
})
</script>

<style scoped>
.content-area {
    height: calc(100vh - 80px);
}
</style>
