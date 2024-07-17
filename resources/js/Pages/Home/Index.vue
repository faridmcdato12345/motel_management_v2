<template>

    <Head title="Home" />
    <AuthenticatedLayout>
        <PrimaryButton>
            <Link :href="route('scan.index')">
            CHECK IN
            </Link>
        </PrimaryButton>
    </AuthenticatedLayout>
</template>

<script setup>
import NavBottom from "@/Components/NavBottom.vue"
import PrimaryButton from "@/Components/PrimaryButton.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Link } from "@inertiajs/vue3";
</script>

<style lang="scss" scoped></style>