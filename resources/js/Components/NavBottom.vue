<template>
    <Teleport to="body">
        <nav
            class="bottom-0 left-0 px-4 fixed h-20 bg-blue-400 backdrop-blur-md dark:bg-blue-400 md:dark:border-white/20 pt-2 pb-1 shadow-md border-t border-white/20 dark:border-gray-800 w-full md:rounded-2xl md:mb-12 md:w-[750px] md:left-1/2 md:-translate-x-1/2 duration-200 ease-in-out z-20">
            <ul class="flex justify-around items-center mb-0 pl-0">
                <Link v-for="link in navLinks" :id="link.id" :key="`${link.label}-route`"
                    :href="route().has(link.link) ? route(link.link) : link.link"
                    class=" hover:bg-green-100/20 dark:hover:bg-green-700/30 dark:hover:text-white hover:text-white focus:text-gray-200 rounded-full px-4 py-4 md:py-2 duration-200 ease-out"
                    :class="isRouteActive(link.link)">
                <div class="flex flex-col items-center cursor-pointer">
                    <component :is="link.icon" class="w-6 h-6 text-white" />
                    <span v-if="!isMobile" class="text-xs md:text-sm text-white">{{ link.label }}</span>
                </div>
                </Link>
            </ul>
        </nav>
    </Teleport>
</template>
<script setup>
import { isMobile } from 'mobile-device-detect'
import { Link } from '@inertiajs/vue3'
import { useNavigationLinks } from '@/Composables/useNavigationLinks'

const { navLinks } = useNavigationLinks()

const isRouteActive = (data) => {
    /* eslint-disable */
    return route().current(data)
        ? 'text-green-500 dark:text-green-500'
        : 'text-gray-400'
}
</script>
