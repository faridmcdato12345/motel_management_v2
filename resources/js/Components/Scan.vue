<template>
    <div class="flex items-center justify-center">
        <div>
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
                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" width="328" height="437"></canvas>
            </div>
            <div class="flex justify-center mt-4 space-x-2 bg-gray-300 rounded-lg" v-if="isCameraOpen">
                <button class="px-4 py-2" :class="scanType === 'voucher' ? 'text-blue-600' : 'text-gray-600'"
                    @click.prevent="scanType = 'voucher'">Voucher</button>
                <button class="px-4 py-2" :class="scanType === 'id' ? 'text-blue-600' : 'text-gray-600'"
                    @click.prevent="scanType = 'id'">Id Card</button>
            </div>
            <div v-if="isCameraOpen && !isLoading"
                class="camera-shoot flex items-center justify-center mt-4 space-x-4 bg-blue-400 py-5 rounded-full">
                <button class="bg-blue-500 text-white px-4 py-2 rounded" @click.prevent="takePhoto">Retake</button>
                <div class="relative" @click.prevent="takePhoto">
                    <div class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center">
                        <div class="w-16 h-16 rounded-full border-4 border-white bg-blue-600"></div>
                    </div>
                </div>
                <div v-if="!loading">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded" v-if="done"
                        @click.prevent="uploadPhoto">Done</button>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded" v-else
                        @click.prevent="nextStep">Next</button>
                </div>
                <div v-else>
                    <Spinner />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import Spinner from './Spinner.vue';
import FileUpload from './FileUpload.vue';
import { onMounted, ref } from 'vue';

const isCameraOpen = ref(false);
const isPhotoTaken = ref(false);
const isShotPhoto = ref(false);
const responseData = ref({})
const isLoading = ref(false);
const done = ref(true)
const loading = ref(false)
const scanType = ref('voucher')
const doneTakePhoto = ref(false)

const camera = ref(null);
const canvas = ref(null);

const emit = defineEmits(['openAiResponse', 'updateData'])

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
const checkFacingModeSupport = () => {
    return new Promise((resolve) => {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        })
            .then(() => resolve(true))
            .catch(() => resolve(false))
    })
}
const createCameraElement = async () => {
    checkFacingModeSupport().then((isSupported) => {
        if (isSupported) {
            console.log('Facing Mode is supported');
        } else {
            console.log('Facing Mode is not supported');
        }
    })
    isLoading.value = true;
    const devices = await navigator.mediaDevices.enumerateDevices();
    const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
    console.log(backCamera)
    const constraints = {
        video: {
            facingMode: 'environment' // This should normally work
        }
    };
    if (backCamera) {
        constraints.video.deviceId = { exact: backCamera.deviceId };
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            isLoading.value = false;
            camera.value.srcObject = stream;
            camera.value.width = 328;
            camera.value.height = 437;
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
    context.clearRect(0, 0, canvas.value.width, canvas.value.height);
    context.drawImage(camera.value, 0, 0, canvas.value.width, canvas.value.height);
    doneTakePhoto.value = true
};
const nextStep = () => {
    emit('updateData', responseData.value)
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
    loading.value = true
    const canvasElement = document.getElementById('photoTaken');
    const dataURL = canvasElement.toDataURL('image/jpeg');
    const blob = dataURLtoBlob(dataURL);
    const formData = new FormData();
    formData.append('image', blob, 'photo.jpg');
    try {
        const response = await axios.post(route('upload.voucher'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((result) => {
            console.log("this is result: ", result)
            loading.value = false
            responseData.value = result.data
            done.value = false

        }).catch(() => {
            loading.value = false
            fileObj.uploading = false;
        });

    } catch (error) {
        console.error('Error uploading image:', error);
        loading.value = false
    } finally {
        loading.value = false
    }
};
onMounted(() => {
    isCameraOpen.value = true;
    createCameraElement();
})
</script>

<style scoped>
canvas {
    width: 328px !important;
    height: 437px !important;
}
</style>