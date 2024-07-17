<template lang="">
    <nav class="mt-4 w-full text-right">
        <Link
        preserveScroll
        :href="[link.url ?? '']"
        :key="link.label"
        v-for="link in links" 
        v-html="link.label"
        class="inline-block py-2 px-3 rounded-lg text-gray-200 text-xs"
        :class="[
            {'bg-gray-950': link.active},
            [!link.url ? '!text-gray-500 cursor-not-allowed' : 'hover:bg-gray-950']
            ]" />
    </nav>
</template>
<script setup>
import { Link } from '@inertiajs/vue3';
defineProps({
    links: Object,
    required: false
})
</script>
<style lang="">

</style>