<template>

    <Head title="Scan" />
    <AuthenticatedLayout>
        <Transition appear>
            <div class="flex flex-col w-full items-center justify-center content-area">
                <div class="w-full flex-col space-y-4">
                    <div class="space-y-2">
                        <FileUpload @update-data="getOpenAiResponse" v-if="step == 1" />
                        <GuestDetail v-if="step == 2" :gptData="openAiData" @update:gptData="getUpdatedData"
                            :guest-types="guestTypes" :room-numbers="roomNumbers" />
                    </div>
                </div>
            </div>
        </Transition>
        <div>
            <NavBottom />
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import FileUpload from "@/Components/FileUpload.vue"
import GuestDetail from "@/Components/GuestDetail.vue"
import Button from "@/Components/Button.vue"
import Scan from "@/Components/Scan.vue"
import NavBottom from "@/Components/NavBottom.vue"
import PrimaryButton from "@/Components/PrimaryButton.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Link, Head } from "@inertiajs/vue3";
import { useStartCamera } from "@/Composables/useStartCamera";


import { ref, onMounted } from 'vue';

const openAiData = ref({})
const getOpenAiResponse = (result) => {
    console.log("getOpenAiResponse: ", result)
    openAiData.value = result
    step.value++
}

const step = ref(1)

const prevStep = () => {
    step.value--
}
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