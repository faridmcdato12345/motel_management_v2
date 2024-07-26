<template>

    <Head title="Motel" />

    <AuthenticatedLayout>
        <div class="md:pl-12 md:pr-4 content-area">
            <div v-if="next">
                <div v-if="recheckIn" class="flex flex-col space-y-4 items-center justify-center w-full">
                    <Link :href="route('scan.index', motelId)">
                    <PrimaryButton :motel-id="motelId">Scan Voucher</PrimaryButton>
                    </Link>
                    <Link :href="route('re_check_in.upload.index', motelId)">
                    <PrimaryButton :motel-id="motelId">Upload Voucher</PrimaryButton>
                    </Link>
                </div>
                <div v-else class="flex flex-col space-y-4 items-center justify-center w-full">
                    <Link :href="route('scan.index', motelId)">
                    <PrimaryButton :motel-id="motelId">Scan Voucher</PrimaryButton>
                    </Link>
                    <Link :href="route('upload.voucher.index', motelId)">
                    <PrimaryButton :motel-id="motelId">Upload Voucher</PrimaryButton>
                    </Link>
                </div>

            </div>
            <div v-else>
                <RoomDatatable :data="props.rooms" :columns="columns" :pagination="props.rooms"
                    @limit-query="limitQuery" @search-field-query="searchFieldQuery" @delete="deleteData"
                    @edit="editData" @checkout="checkout" :query-limit="props.queryLimit" :route-create="createRoute"
                    :query-name="props.queryName" :action="false" :checkout="false" @check-in="checkIn"
                    @recheck-in-checked-in="recheckInCheckedIn" />
            </div>
        </div>
        <!-- <div>
            <NavBottom />
        </div> -->
    </AuthenticatedLayout>
</template>

<script setup>
import PrimaryButton from "@/Components/PrimaryButton.vue";
import NavBottom from "@/Components/NavBottom.vue"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, onMounted } from "vue"
import { router, Head, useForm, usePage, Link } from "@inertiajs/vue3";
import RoomDatatable from "@/Components/RoomDatatable.vue";

const motelId = ref('')
const next = ref(false)
const recheckIn = ref(false)
const columns = ref([
    { label: 'ROOM #', key: 'room_number' }
])
const props = defineProps({
    rooms: {
        type: Object,
    },
})
const checkout = () => {
    console.log("checkout")
}
const checkIn = (id) => {
    next.value = true
    motelId.value = id
}
const recheckInCheckedIn = (id) => {
    recheckIn.value = true
    next.value = true
    motelId.value = id
}
onMounted(() => {
    console.log(props.rooms)
})
</script>

<style scoped>
.content-area {
    height: calc(100vh - 4rem);
}
</style>