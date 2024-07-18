<template>

    <Head title="Scan" />
    <AuthenticatedLayout>
        <Transition appear>
            <div class="flex items-center justify-center h-screen">
                <div>
                    <div class="h-screen" v-if="roomNumbers.length">
                        <Scan v-if="step == 1" @update-data="getOpenAiResponse" />
                        <GuestDetail v-if="step == 2" :gptData="openAiData" @update:gptData="getUpdatedData"
                            :guest-types="guestTypes" :room-numbers="roomNumbers" />
                    </div>
                    <div class="flex justify-between mt-4 space-x-4" v-else>
                        <div class="flex justify-center w-full bg-red-800 rounded-md">
                            <button class="text-white p-4 font-black text-lg">NO ROOM AVAILABLE</button>
                        </div>
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
import GuestDetail from "@/Components/GuestDetail.vue"
import Scan from "@/Components/Scan.vue"
import NavBottom from "@/Components/NavBottom.vue"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";


import { ref, onMounted } from 'vue';

const props = defineProps({
    guestTypes: Object,
    roomNumbers: Object
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

<style lang="scss" scoped></style>