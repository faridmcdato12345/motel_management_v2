<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';
import SwitchButton from '@/Components/SwitchButton.vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const showingNavigationDropdown = ref(false);
const showingSettingNavigationDropDown = ref(false)

const page = usePage()
const auth = computed(() => page.props.auth);

const hasPermission = (permission) => {
    return auth.value.permissions && auth.value.permissions.includes(permission);
};
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('dashboard')">
                                <ApplicationLogo
                                    class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="route('user.home')" :active="route().current('user.home')">
                                    Home
                                </NavLink>
                                <NavLink v-if="hasPermission('show user')" :href="route('users.index')"
                                    :active="route().current('users.index')">
                                    Users
                                </NavLink>
                                <NavLink v-if="hasPermission('show motel')" :href="route('motel.index')"
                                    :active="route().current('motel.index')">
                                    Motel
                                </NavLink>
                                <NavLink v-if="hasPermission('show motel')" :href="route('all.vouchers')"
                                    :active="route().current('all.vouchers')">
                                    Vouchers
                                </NavLink>
                                <NavLink v-if="hasPermission('show motel')" :href="route('payments.index')"
                                    :active="route().current('payments.index')">
                                    Payments
                                </NavLink>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <!---switch button darkmode-->
                            <div>
                                <SwitchButton />
                            </div>
                            <!----hamburger menu-->
                            <div>
                                <div class="hidden sm:flex sm:items-center sm:ms-6">
                                    <!-- Settings Dropdown -->
                                    <div class="ms-3 relative">
                                        <Dropdown align="right" width="48">
                                            <template #trigger>
                                                <span class="inline-flex rounded-md">
                                                    <button type="button"
                                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                        {{ $page.props.auth.user.name }}

                                                        <svg class="ms-2 -me-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                            fill="currentColor">
                                                            <path fill-rule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </template>

                                            <template #content>
                                                <DropdownLink :href="route('profile.edit')"> Profile </DropdownLink>
                                                <a href="#"
                                                    class="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                                    @click.stop="showingSettingNavigationDropDown = !showingSettingNavigationDropDown">
                                                    Settings
                                                </a>
                                                <div class="mt-3 px-4"
                                                    :class="{ block: showingSettingNavigationDropDown, hidden: !showingSettingNavigationDropDown }">
                                                    <DropdownLink :href="route('guest_type.index')">
                                                        Guest Age Group
                                                    </DropdownLink>
                                                    <DropdownLink :href="route('rates.index')">
                                                        Rate
                                                    </DropdownLink>
                                                    <DropdownLink :href="route('room_type.index')"
                                                        :active="route().current('room_type.index')">
                                                        Room Type
                                                    </DropdownLink>
                                                    <DropdownLink :href="route('rooms.index')">
                                                        Rooms
                                                    </DropdownLink>
                                                    <DropdownLink v-if="hasPermission('show motel')"
                                                        :href="route('roles.index')">
                                                        Roles
                                                    </DropdownLink>
                                                </div>
                                                <DropdownLink :href="route('logout')" method="post" as="button">
                                                    Log Out
                                                </DropdownLink>
                                            </template>
                                        </Dropdown>
                                    </div>
                                </div>
                                <!-- Hamburger -->
                                <div class="-me-2 flex items-center sm:hidden">
                                    <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path :class="{
                                                hidden: showingNavigationDropdown,
                                                'inline-flex': !showingNavigationDropdown,
                                            }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 6h16M4 12h16M4 18h16" />
                                            <path :class="{
                                                hidden: !showingNavigationDropdown,
                                                'inline-flex': showingNavigationDropdown,
                                            }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink :href="route('user.home')" :active="route().current('user.home')">
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="hasPermission('show user')" :href="route('users.index')"
                            :active="route().current('users.index')">
                            Users
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="hasPermission('show motel')" :href="route('motel.index')"
                            :active="route().current('motel.index')">
                            Motel
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="hasPermission('show motel')" :href="route('roles.index')"
                            :active="route().current('roles.index')">
                            Roles
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="hasPermission('show motel')" :href="route('all.vouchers')"
                            :active="route().current('all.vouchers')">
                            Vouchers
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="hasPermission('show motel')" :href="route('payments.index')"
                            :active="route().current('payments.index')">
                            Payments
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="font-medium text-sm text-gray-500">{{ $page.props.auth.user.email }}</div>
                        </div>
                        <div class="mt-3 px-4"
                            @click="showingSettingNavigationDropDown = !showingSettingNavigationDropDown">
                            <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                                Settings
                            </div>
                        </div>
                        <div class="mt-3 px-4"
                            :class="{ block: showingSettingNavigationDropDown, hidden: !showingSettingNavigationDropDown }">
                            <ResponsiveNavLink :href="route('guest_type.index')"
                                :active="route().current('guest_type.index')">
                                Guest Age Group
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('rates.index')" :active="route().current('rates.index')">
                                Rate
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('room_type.index')"
                                :active="route().current('room_type.index')">
                                Room Type
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('rooms.index')" :active="route().current('rooms.index')">
                                Rooms
                            </ResponsiveNavLink>
                        </div>
                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')"> Profile </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white dark:bg-gray-800 shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>

            </main>
        </div>
    </div>
</template>
