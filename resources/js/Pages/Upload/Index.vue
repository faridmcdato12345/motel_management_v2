<template>

    <Head title="Scan" />
    <AuthenticatedLayout>
        <Transition appear>
            <div class="flex flex-col w-full items-center justify-center">
                <div class="w-full flex-col space-y-4">
                    <FileUpload @update-data="getOpenAiResponse" v-if="step == 1" />
                    <GuestDetail v-if="step == 2" :gptData="openAiData" @update:gptData="getUpdatedData"
                        :guest-types="guestTypes" :room="room" :re-check-in="recheckin" />
                </div>
            </div>
        </Transition>
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


import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    guestTypes: Object,
    room: Object,
    recheckin: {
        type: Boolean,
        default: false
    }
})
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
    if (props.recheckin) {

    }
})
</script>

<style scoped>
.content-area {
    height: calc(100vh - 80px);
}
</style>