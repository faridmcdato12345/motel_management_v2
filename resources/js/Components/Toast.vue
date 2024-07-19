<template>
    <TransitionGroup tag="div" enter-from-class="translate-x-full opacity-0" enter-active-class="duration-500"
        leave-active-class="duration-500" leave-to-class="translate-x-full opacity-0"
        class="fixed top-4 right-4 z-[100]">
        <ToastItem v-for="(item, index) in toast.items" :key="item.key" :message="item.message" :status="item.status"
            @remove="removeToast(index)" :duration="10000" />
    </TransitionGroup>
</template>

<script setup>
import ToastItem from "./ToastItem.vue";
import toast from "@/Composable/toast";
import { router, usePage } from "@inertiajs/vue3";
import { onUnmounted } from "vue";

const removeToast = (index) => {
    toast.remove(index)
}

</script>

<style lang="scss" scoped></style>