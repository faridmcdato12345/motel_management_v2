<template>
    <div>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only" v-model="isDarkMode" @change="toggleDarkMode">
            <div class="w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 duration-300 ease-in-out relative">
                <div class="absolute">
                    <div class="flex">
                        <component :is="MoonIcon" class="w-6 h-6" />
                        <component :is="SunIcon" class="w-6 h-6" />
                    </div>

                </div>
                <div :class="{
                    'translate-x-6': isDarkMode,
                    'translate-x-0': !isDarkMode,
                }" class="bg-white dark:bg-gray-900 w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out">

                </div>
            </div>
        </label>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import {
    MoonIcon,
    SunIcon,
} from "@heroicons/vue/24/solid";
const isDarkMode = ref(false);

const toggleDarkMode = () => {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

watch(isDarkMode, toggleDarkMode);
</script>