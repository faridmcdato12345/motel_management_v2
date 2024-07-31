<template>
    <div class="">
        <div class="relative">
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
                <video v-show="!isPhotoTaken" ref="camera" autoplay class="w-full"></video>
                <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas"></canvas>
                <canvas class="hiddenCVSForFrame" style="display:none"></canvas>
            </div>
            <!-- <div class="flex justify-center mt-4 space-x-2 bg-gray-300 rounded-lg" v-if="isCameraOpen">
                <button class="px-4 py-2" :class="scanType === 'voucher' ? 'text-blue-600' : 'text-gray-600'"
                    @click.prevent="scanType = 'voucher'">Voucher</button>
                <button class="px-4 py-2" :class="scanType === 'id' ? 'text-blue-600' : 'text-gray-600'"
                    @click.prevent="scanType = 'id'">Id Card</button>
            </div> -->

            <div v-if="isCameraOpen && !isLoading"
                class="absolute bottom-0 camera-shoot flex items-center justify-center mt-4 space-x-4 bg-blue-400 py-5 w-full">
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
            <div class="cropper full" style="display:none;">
                <image-cropper></image-cropper>
            </div>
            <div class="resultViewer full" style="display:none;">
                <div class="imageContainer">
                    <img id="normalized" alt="normalized">
                </div>
                <div class="toolbar">
                    <div class="rotateButton">
                        <img class="icon" src="assets/rotate-counter-clockwise.svg" alt="rotate" />
                    </div>
                    <div class="filterButton">
                        <img class="icon" src="assets/color-filter.svg" alt="color-filter" />
                    </div>
                </div>
                <div class="filterList" style="display:none;">
                    <div class="blackWhite filterItem">
                        <img class="filterImg" alt="blackwhite" />
                        <div class="filterLabel">B&W</div>
                    </div>
                    <div class="grayscale filterItem">
                        <img class="filterImg" alt="grayscale" />
                        <div class="filterLabel">Grayscale</div>
                    </div>
                    <div class="color filterItem">
                        <img class="filterImg" alt="color" />
                        <div class="filterLabel">Color</div>
                    </div>
                </div>
                <div class="okayCancelFooter">
                    <div class="resultViewerCancelButton cancel">
                        <img class="icon" src="assets/cancel.svg" alt="cancel" />
                    </div>
                    <div class="resultViewerOkayButton okay">
                        <img class="icon" src="assets/okay.svg" alt="okay" />
                    </div>
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
const cameraDevices = ref([])
const camera = ref(null);
const canvas = ref(null);
let ddn = ref('')

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
    for (let i = 0; i < devices.length; i++) {
        let device = devices[i];
        if (device.kind == 'videoinput') { // filter out audio devices
            cameraDevices.value = device;
        }
    }
    const constraints = {
        video: {
            width: 1280,
            height: 720,
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
            camera.width = 1280;
            camera.height = 720;
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
    loadPhotoToCropper(blob)
    // const formData = new FormData();
    // formData.append('image', blob, 'photo.jpg');
    // try {
    //     const response = await axios.post(route('upload.voucher'), formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         },
    //     }).then((result) => {
    //         console.log("this is result: ", result)
    //         loading.value = false
    //         responseData.value = result.data
    //         done.value = false

    //     }).catch(() => {
    //         loading.value = false
    //         fileObj.uploading = false;
    //     });

    // } catch (error) {
    //     console.error('Error uploading image:', error);
    //     loading.value = false
    // } finally {
    //     loading.value = false
    // }
};
const loadPhotoToCropper = async (img) => {
    let cropper = document.querySelector("image-cropper");
    cropper.img = img;
    let quads = await ddn.detectQuad(img);
    if (quads.length == 0) {
        let x = img.width * 0.2;
        let width = img.width * 0.6;
        let y = img.height * 0.2;
        let height = img.height * 0.4;
        quads.push({
            location: {
                points: [
                    { x: x, y: y },
                    { x: x + width, y: y },
                    { x: x + width, y: y + height },
                    { x: x, y: y + height },
                ]
            }
        })
    }
    detectedQuad = quads[0];
    cropper.quad = detectedQuad.location;
}
const loadNormalizedAndFilterImages = async () => {
    let modes = ["blackWhite", "grayscale", "color"];
    let img = document.getElementsByClassName("imageCaptured")[0];
    let cvs = document.getElementsByClassName("hiddenCVS")[0];
    let ratio = drawResizedThumbnailImageToCanvas(img, cvs);
    let scaledQuad = replicatedScaledQuad(detectedQuad, ratio);
    console.log(detectedQuad);
    console.log(scaledQuad);
    for (let index = 0; index < modes.length; index++) {
        const mode = modes[index];
        let filterImg = document.querySelector("." + mode + " .filterImg");
        await updateTemplate(mode);
        let imageData = await ddn.normalize(cvs, { quad: scaledQuad.location });
        filterImg.src = imageData.image.toCanvas().toDataURL();
        filterImg.normalizedImage = undefined;
        if (mode === "color") {
            imageData = await ddn.normalize(img, { quad: detectedQuad.location })
            filterImg.normalizedImage = imageData.image.toCanvas().toDataURL();
        }
    }
}
const updateTemplate = async (mode) => {
    let template;
    if (mode === "blackWhite") {
        template = "{\"GlobalParameter\":{\"Name\":\"GP\",\"MaxTotalImageDimension\":0},\"ImageParameterArray\":[{\"Name\":\"IP-1\",\"NormalizerParameterName\":\"NP-1\",\"BaseImageParameterName\":\"\"}],\"NormalizerParameterArray\":[{\"Name\":\"NP-1\",\"ContentType\":\"CT_DOCUMENT\",\"ColourMode\":\"ICM_BINARY\"}]}";
    } else if (mode === "grayscale") {
        template = "{\"GlobalParameter\":{\"Name\":\"GP\",\"MaxTotalImageDimension\":0},\"ImageParameterArray\":[{\"Name\":\"IP-1\",\"NormalizerParameterName\":\"NP-1\",\"BaseImageParameterName\":\"\"}],\"NormalizerParameterArray\":[{\"Name\":\"NP-1\",\"ContentType\":\"CT_DOCUMENT\",\"ColourMode\":\"ICM_GRAYSCALE\"}]}";
    } else {
        template = "{\"GlobalParameter\":{\"Name\":\"GP\",\"MaxTotalImageDimension\":0},\"ImageParameterArray\":[{\"Name\":\"IP-1\",\"NormalizerParameterName\":\"NP-1\",\"BaseImageParameterName\":\"\"}],\"NormalizerParameterArray\":[{\"Name\":\"NP-1\",\"ContentType\":\"CT_DOCUMENT\",\"ColourMode\":\"ICM_COLOUR\"}]}";
    }
    console.log(template);
    await ddn.setRuntimeSettings(template);
}
const rotateImage = (imgElement) => {
    let canvas = document.getElementsByClassName("hiddenCVS")[0];
    let ctx = canvas.getContext("2d");
    // Assign width and height.
    if (rotationDegree === -180) {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
    } else {
        canvas.width = imgElement.height;
        canvas.height = imgElement.width;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Rotate the image and draw it on the canvas. 
    // (I am not showing the canvas on the webpage.
    ctx.rotate(rotationDegree * Math.PI / 180);
    ctx.drawImage(imgElement, -imgElement.width / 2, -imgElement.height / 2);
    imgElement.src = canvas.toDataURL();
    console.log("rotate");
    console.log(imgElement);
}
const registerEventsForCropper = () => {
    const cropper = document.querySelector("image-cropper");
    cropper.addEventListener("confirmed", async function () {
        console.log("confirm");
        const quad = await cropper.getQuad();
        detectedQuad.location = quad;
        toggleStatusMask("Normalizing...");
        await loadNormalizedAndFilterImages();
        document.getElementById("normalized").src = document.querySelector(".color .filterImg").normalizedImage;
        toggleStatusMask("");
        switchPage(3);
    });
    cropper.addEventListener("canceled", function () {
        startSelectedCamera();
    });
}
const initDDN = async () => {
    Dynamsoft.DDN.DocumentNormalizer.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAzMDc0ODA1LVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAzMDc0ODA1Iiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjoxMDA1MTM4NDQ0fQ==";
    ddn = await Dynamsoft.DDN.DocumentNormalizer.createInstance();
    ddn.maxCvsSideLength = 9999;
}
onMounted(() => {
    initDDN()
    isCameraOpen.value = true;
    createCameraElement();
    registerEventsForCropper
})
</script>

<style scoped>
canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>