<template>
    <div class="flex items-center justify-center">
        <div>
            <!-- <FileUpload @update-data="getOpenAiResponse" /> -->
            <div class="camera-button">
                <button type="button" class="button is-rounded"
                    :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
                    <span v-if="!isCameraOpen">Open Camera</span>
                    <span v-else>Close Camera</span>
                </button>
            </div>
            <div v-show="isCameraOpen && isLoading" class="camera-loading">
                <ul class="loader-circle">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box w-full relative"
                :class="{ flash: isShotPhoto }">
                <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>
                <video v-show="!isPhotoTaken" ref="camera" class="rounded-lg" :width="450" :height="337.5"
                    autoplay></video>
                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
            </div>
            <div class="flex justify-center mt-4 space-x-2 bg-gray-300 rounded-lg" v-if="isCameraOpen">
                <button class="px-4 py-2 text-gray-600">Id Card</button>
                <button class="px-4 py-2 text-blue-500">Voucher</button>
            </div>
            <div v-if="isCameraOpen && !isLoading"
                class="camera-shoot flex items-center justify-center mt-4 space-x-4 bg-blue-400 py-5 rounded-full">
                <button class="bg-blue-500 text-white px-4 py-2 rounded" @click.prevent="takePhoto">Retake</button>
                <div class="relative" @click.prevent="takePhoto">
                    <div class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full border-4 border-white bg-blue-600"></div>
                    </div>
                </div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" v-if="done"
                    @click.prevent="doneAction">Done</button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" v-else
                    @click.prevent="uploadPhoto">Next</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import FileUpload from './FileUpload.vue';
import { onMounted, ref } from 'vue';


const isCameraOpen = ref(false);
const isPhotoTaken = ref(false);
const isShotPhoto = ref(false);
const isLoading = ref(false);
const done = ref(true)
const doneTakePhoto = ref(false)

const camera = ref(null);
const canvas = ref(null);

const emit = defineEmits(['openAiResponse'])

const getOpenAiResponse = (response) => {
    console.log("updated data: ", response)
    emit('openAiResponse', response)
}
const toggleCamera = () => {
    if (isCameraOpen.value) {
        isCameraOpen.value = false;
        isPhotoTaken.value = false;
        isShotPhoto.value = false;
        stopCameraStream();
    } else {
        isCameraOpen.value = true;
        createCameraElement();
    }
};

const createCameraElement = () => {
    isLoading.value = true;

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                facingMode: { exact: 'environment' }
            },
        })
        .then((stream) => {
            isLoading.value = false;
            camera.value.srcObject = stream;
        })
        .catch((error) => {
            isLoading.value = false;
            alert("May the browser didn't support or there is some errors.");
        });
};

const stopCameraStream = () => {
    const tracks = camera.value.srcObject.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
};

const takePhoto = () => {
    if (!isPhotoTaken.value) {
        isShotPhoto.value = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
            isShotPhoto.value = false;
        }, FLASH_TIMEOUT);
    }
    if (done.value == false) {
        done.value = true
    }
    isPhotoTaken.value = !isPhotoTaken.value;

    const context = canvas.value.getContext('2d');
    context.drawImage(camera.value, 0, 0, 450, 337.5);
    doneTakePhoto.value = true
};
const doneAction = () => {
    console.log(doneTakePhoto.value)
    if (doneTakePhoto.value == true) {
        done.value = false
    }
}
const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
const uploadPhoto = async () => {
    const canvasElement = document.getElementById('photoTaken');
    const dataURL = canvasElement.toDataURL('image/jpeg');
    const blob = dataURLtoBlob(dataURL);
    const formData = new FormData();
    formData.append('image', blob, 'photo.jpg');
    try {
        const response = await axios.post(route('upload.voucher'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Image uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};
onMounted(() => {
    isCameraOpen.value = true;
    createCameraElement();
})
</script>

<style scoped></style>