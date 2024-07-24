<template>
    <div>
        <div class="border-2 border-dashed border-gray-300 p-5 cursor-pointer flex items-center justify-center"
            @dragover.prevent @drop.prevent="handleDrop">
            <div>
                <input type="file" ref="fileInput" @change="handleFileSelect" hidden multiple />
                <div class="flex flex-col items-center">
                    <p>Upload file</p>
                </div>
                <button class="bg-blue-500 text-white py-2 px-4 rounded w-full" @click="browseFiles">Browse for
                    file</button>
            </div>
        </div>
        <div class="flex justify-center w-full bg-blue-400 rounded-md mt-4">
            <Spinner v-if="spinner" class="p-4" />
            <Button v-if="nextButton" :label="'Next'" btn-block class="p-4" color="success" @click.prevent="nextStep" />
        </div>
    </div>
</template>

<script setup>
import Button from "@/Components/Button.vue"
import Spinner from './Spinner.vue';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import axios from 'axios';

const file = ref(null);
const imageUrl = ref(null);
const responseData = ref({})
const fileInput = ref(null);
const files = ref([]);
const spinner = ref(false)
const nextButton = ref(false)

const emit = defineEmits(['updateData'])

const browseFiles = () => {
    fileInput.value.click();
};
const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};
const handleFileSelect = (event) => {
    handleFiles(event.target.files);
};
const handleDrop = (event) => {
    handleFiles(event.dataTransfer.files);
};
const handleFiles = (selectedFiles) => {
    for (const file of selectedFiles) {
        const fileObj = {
            file,
            name: file.name,
            uploading: true,
            progress: 0
        };
        files.value.push(fileObj);
        uploadFile(fileObj);
    }
};
const nextStep = () => {
    emit('updateData', responseData.value)
}
const uploadFile = (fileObj) => {
    spinner.value = true
    const formData = new FormData();
    formData.append('image', fileObj.file);

    try {
        const response = axios.post(route('upload.voucher'), formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                fileObj.progress = percentCompleted;
            },

        }).then((result) => {
            fileObj.uploading = false;
            responseData.value = result.data
            spinner.value = false
            nextButton.value = true
            console.log("responseData: ", responseData.value)
            if (responseData.value.original.error) {
                nextButton.value = false
                spinner.value = false
            } else {

            }
        }).catch((error) => {
            console.log(error)
            fileObj.uploading = false;
        });
    } catch (error) {
        console.error('Error uploading image:', error);
    } finally {
        spinner.value = true
    }
};
const removeFile = (file) => {
    const index = files.value.indexOf(file);
    if (index > -1) {
        files.value.splice(index, 1);
    }
};
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>