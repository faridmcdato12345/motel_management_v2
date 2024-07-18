<template>

    <Head title="Role" />
    <AuthenticatedLayout>
        <Transition appear>
            <div class="p-6 bg-white rounded-lg shadow-md mt-4">
                <h2 class="text-xl font-semibold mb-4">Edit Role</h2>
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700">Role Profile</label>
                        <input v-model="roleProfile" type="text"
                            class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div class="flex justify-between items-center mb-4">
                        <button type="button" @click="selectAll"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Select
                            All</button>
                        <button type="button" @click="unselectAll"
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Unselect
                            All</button>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div v-for="permission in permissions" :key="permission.id" class="flex items-center">
                            <input v-model="selectedPermissions" type="checkbox" :value="permission.name"
                                class="form-checkbox h-5 w-5 text-blue-600">
                            <span class="ml-2 text-sm text-gray-700">{{ permission.name }}</span>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-between">
                        <button type="submit"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update
                            Role</button>
                        <button type="button" @click="deleteRole"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete
                            Role</button>
                    </div>
                </form>
            </div>
        </Transition>
    </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { ref, reactive, watch } from 'vue';
import { usePage, useForm } from "@inertiajs/vue3";

const { props } = usePage();
const role = reactive(props.role);
const permissions = props.permissions;
const rolePermissions = props.rolePermissions;
const roleProfile = ref(role.name);
const selectedPermissions = ref(rolePermissions);

watch(() => roleProfile.value, (newVal) => {
    form.name = newVal;
});
watch(() => selectedPermissions.value, (newVal) => {
    form.permissions = newVal;
});
const selectAll = () => {
    selectedPermissions.value = permissions.map(permission => permission.name);
};

const unselectAll = () => {
    selectedPermissions.value = [];
};

const form = useForm({
    name: roleProfile.value,
    permissions: selectedPermissions.value
});

const submitForm = () => {
    form.put(route('roles.update', role.id), {
        onSuccess: () => {
            form.reset('permissions');
            form.name = roleProfile.value;
            form.permissions = selectedPermissions.value;
        }
    });
};

const deleteRole = () => {
    if (confirm('Are you sure you want to delete this role?')) {
        form.delete(route('roles.destroy', role.id), {
            onSuccess: () => {
                form.reset();
            }
        });
    }
};
</script>

<style>
/* Add any custom styles here if necessary */
</style>
