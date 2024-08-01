<template>
    <div class="">
        <div class="relative">
            <div class="home" style="display: none">
                <select class="cameraSelect"></select>
                <br />
                <select class="resolutionSelect">
                    <option value="1280x720">1280x720</option>
                    <option value="1920x1080">1920x1080</option>
                    <option value="3840x2160">3840x2160</option>
                </select>
                <br />
                <button class="startCameraBtn">Start Camera</button>
                <input type="file" id="imageFile" style="display:none;" onchange="loadImageFromFile();"
                    accept=".jpg,.jpeg,.png,.bmp" />
                <button class="loadImageBtn" style="display:none;">Load Image</button>
                <div class="loadingStatus">Loading...</div>
                <div class="results"></div>
            </div>
            <div class="home" style="display: none">
                <select class="cameraSelect"></select>
                <br />
                <select class="resolutionSelect">
                    <option value="1280x720">1280x720</option>
                    <option value="1920x1080">1920x1080</option>
                    <option value="3840x2160">3840x2160</option>
                </select>
                <br />
                <button class="startCameraBtn">Start Camera</button>
                <input type="file" id="imageFile" style="display:none;" onchange="loadImageFromFile();"
                    accept=".jpg,.jpeg,.png,.bmp" />
                <button class="loadImageBtn" style="display:none;">Load Image</button>
                <div class="loadingStatus">Loading...</div>
                <div class="results"></div>
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
                <video v-show="!isPhotoTaken" ref="cameraRef" autoplay class="w-full"></video>
                <!-- <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas"></canvas> -->
                <canvas class="hiddenCVSForFrame" style="display:none"></canvas>
                <canvas class="hiddenCVS" style="display:none"></canvas>
                <img class="imageCaptured" style="display:none" />
                <svg class="overlay full absolute top-0" version="1.1" xmlns="http://www.w3.org/2000/svg">
                </svg>
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
                    <div class="autoCaptureButton">
                        <img class="icon" src="" alt="auto" />
                    </div>
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
                        <img class="icon" src="" alt="rotate" />
                    </div>
                    <div class="filterButton">
                        <img class="icon" src="" alt="color-filter" />
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
                        <img class="icon" src="" alt="cancel" />
                    </div>
                    <div class="resultViewerOkayButton okay">
                        <img class="icon" src="" alt="okay" />
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
const cameraRef = ref(null);
const canvas = ref(null);
const previousResults = ref([]);
const interval = ref('');
let vid
let ddn
let imageCapture
let cameraSelect
let resolutionSelect
let localStream
const detecting = ref(false)

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
const createCameraElement = () => {
    let vids = cameraRef.value
    vid = document.querySelector('video');
    vid.addEventListener('loadeddata', (event) => {
        console.log("video started");
        document.getElementsByClassName("overlay")[0].setAttribute("viewBox", "0 0 " + vid.videoWidth + " " + vid.videoHeight);
        startDetecting();
    });
};

const stopCameraStream = () => {
    const tracks = camera.value.srcObject.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
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
    capture()
    //loadPhotoToCropper(blob)
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
const startDetecting = () => {
    detecting.value = false;
    stopDetecting();
    interval.value = setInterval(detect, 300);
}

const stopDetecting = () => {
    previousResults.value = [];
    clearInterval(interval.value);
}
const detect = async () => {
    if (detecting.value === true) {
        return;
    }
    detecting.value = true;
    let cvs = document.getElementsByClassName("hiddenCVSForFrame")[0];
    let scaleDownRatio = captureFrame(cvs, true);
    const quads = await ddn.detectQuad(cvs);
    detecting.value = false;
    let overlay = document.getElementsByClassName("overlay")[0];
    if (quads.length > 0) {
        let quad = quads[0];
        console.log(quad);
        if (scaleDownRatio != 1) {
            scaleQuad(quad, scaleDownRatio);
        }
        drawOverlay(quad, overlay);
        if (document.getElementsByClassName("autoCaptureButton")[0].classList.contains("enabled")) {
            autoCapture(quad);
        }
    } else {
        overlay.innerHTML = "";
    }
}
const autoCapture = async (points) => {
    if (previousResults.length >= 2) {
        previousResults.push(points)
        if (steady() == true) {
            console.log("steady");
            await capture();
        } else {
            console.log("shift result");
            previousResults.shift();
        }
    } else {
        console.log("add result");
        previousResults.push(points);
    }
}
const steady = () => {
    let iou1 = intersectionOverUnion(previousResults[0].location.points, previousResults[1].location.points);
    let iou2 = intersectionOverUnion(previousResults[1].location.points, previousResults[2].location.points);
    let iou3 = intersectionOverUnion(previousResults[0].location.points, previousResults[2].location.points);
    console.log(iou1);
    console.log(iou2);
    console.log(iou3);
    if (iou1 > 0.9 && iou2 > 0.9 && iou3 > 0.9) {
        return true;
    } else {
        return false;
    }
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
        await loadNormalizedAndFilterImages();
        document.getElementById("normalized").src = document.querySelector(".color .filterImg").normalizedImage;
    });
    cropper.addEventListener("canceled", function () {
        startSelectedCamera();
    });
}
const startSelectedCamera = () => {
    let options = {};
    cameraSelect = document.getElementsByClassName("cameraSelect")[0];
    if (cameraSelect.selectedIndex != -1) {
        options.deviceId = cameraSelect.selectedOptions[0].value;
    }
    resolutionSelect = document.getElementsByClassName("resolutionSelect")[0];
    if (resolutionSelect.selectedIndex != -1) {
        let width = parseInt(resolutionSelect.selectedOptions[0].value.split("x")[0]);
        let height = parseInt(resolutionSelect.selectedOptions[0].value.split("x")[1]);
        let res = { width: width, height: height };
        options.desiredResolution = res;
    }
    play(options);
}
const play = (options) => {
    return new Promise(function (resolve, reject) {
        stop(); // close before play
        let constraints = {};

        if (options.deviceId) {
            constraints = {
                video: { deviceId: options.deviceId },
                audio: false
            }
        } else {
            constraints = {
                video: { width: 1280, height: 720, facingMode: { exact: "environment" } },
                audio: false
            }
        }

        if (options.desiredResolution) {
            constraints["video"]["width"] = options.desiredResolution.width;
            constraints["video"]["height"] = options.desiredResolution.height;
        }
        console.log(constraints);
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            localStream = stream;
            // Attach local stream to video element
            vid = document.querySelector('video');
            vid.srcObject = stream;

            // try {
            //     if (localStream.getVideoTracks()[0].getCapabilities().torch === true) {
            //         console.log("torch supported");
            //         document.getElementsByClassName("flashButton")[0].style.display = "";
            //     } else {
            //         document.getElementsByClassName("flashButton")[0].style.display = "none";
            //     }
            // } catch (error) {
            //     document.getElementsByClassName("flashButton")[0].style.display = "none";
            // }

            if ("ImageCapture" in window) {
                console.log("ImageCapture supported");
                const track = localStream.getVideoTracks()[0];
                imageCapture = new ImageCapture(track);
            } else {
                console.log("ImageCapture not supported");
            }
            resolve(true);
        }).catch(function (err) {
            console.error('getUserMediaError', err, err.stack);
            reject(err);
        });
    });

}
const stop = () => {
    try {
        if (localStream) {
            const tracks = localStream.getTracks();
            for (let i = 0; i < tracks.length; i++) {
                const track = tracks[i];
                track.stop();
            }
        }
    } catch (e) {
        alert(e.message);
    }
};
const replicatedScaledQuad = (quad, scaleDownRatio) => {
    let newQuad = JSON.parse(JSON.stringify(quad));
    let points = newQuad.location.points;
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        point.x = parseInt(point.x * scaleDownRatio);
        point.y = parseInt(point.y * scaleDownRatio);
    }
    return newQuad;
}
const scaleQuad = (quad, scaleDownRatio) => {
    let points = quad.location.points;
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        point.x = parseInt(point.x / scaleDownRatio);
        point.y = parseInt(point.y / scaleDownRatio);
    }
}
const drawOverlay = (quad, svg) => {
    let points = quad.location.points;
    let polygon;
    if (svg.getElementsByTagName("polygon").length === 1) {
        polygon = svg.getElementsByTagName("polygon")[0];
    } else {
        polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("class", "detectedPolygon");
        svg.appendChild(polygon);
    }
    polygon.setAttribute("points", getPointsData(points));
}
const getPointsData = (points) => {
    let pointsData = points[0].x + "," + points[0].y + " ";
    pointsData = pointsData + points[1].x + "," + points[1].y + " ";
    pointsData = pointsData + points[2].x + "," + points[2].y + " ";
    pointsData = pointsData + points[3].x + "," + points[3].y;
    return pointsData;
}
const capture = async () => {
    stopDetecting();
    resetCropper();
    let imageCaptured = document.getElementsByClassName("imageCaptured")[0];
    console.log("imageCaptured:", imageCaptured)
    imageCaptured.onload = function () {
        loadPhotoToCropper(imageCaptured);
    }

    if (imageCapture) {
        try {
            console.log("take photo");
            await takePhoto(imageCaptured);
        } catch (error) {
            console.log(error);
            captureFullFrame(imageCaptured);
        }
    } else {
        captureFullFrame(imageCaptured);
    }
    resetPreviousStatus();
    stop();
}
const captureFullFrame = (img) => {
    let cvs = document.getElementsByClassName("hiddenCVS")[0];
    captureFrame(cvs);
    img.src = cvs.toDataURL();
}
const captureFrame = (canvas, enableScale) => {
    let w = vid.videoWidth;
    let h = vid.videoHeight;
    let scaleDownRatio = 1;
    if (enableScale === true) {
        if (w > 2000 || h > 2000) {
            w = 1080;
            h = w * (vid.videoHeight / vid.videoWidth);
            scaleDownRatio = w / vid.videoWidth;
        }
    }
    canvas.width = w;
    canvas.height = h;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(vid, 0, 0, w, h);
    return scaleDownRatio;
}
const takePhoto = (img) => {
    return new Promise(async function (resolve, reject) {
        try {
            let blob = await imageCapture.takePhoto();
            img.src = URL.createObjectURL(blob);
            resolve(true);
        } catch (error) {
            reject(error); //it may not work with virtual cameras
        }
    });
}
const resetCropper = () => {
    let cropper = document.querySelector("image-cropper");
    cropper.quad = null;
    cropper.img = null;
}
const resetPreviousStatus = () => {
    rotationDegree = 0;
    document.getElementById("normalized").style.transform = "";
    document.getElementsByClassName("flashButton")[0].classList.remove("invert");
    if (document.querySelector(".filterImg.selected")) {
        document.querySelector(".filterImg.selected").classList.remove("selected");
    }
    if (document.querySelector(".filterImg.selected")) {
        document.querySelector(".filterImg.selected").classList.remove("selected");
    }
    toggleFilterList(true);
}
const toggleFilterList = (hide) => {
    let filterButton = document.getElementsByClassName("filterButton")[0];
    let filterList = document.getElementsByClassName("filterList")[0];
    if (filterButton.classList.contains("invert") || hide === true) {
        filterButton.classList.remove("invert");
        filterList.style.display = "none";
    } else {
        filterButton.classList.add("invert");
        filterList.style.display = "";
    }
}
const initDDN = async () => {
    Dynamsoft.DDN.DocumentNormalizer.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAzMDc0ODA1LVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAzMDc0ODA1Iiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjoxMDA1MTM4NDQ0fQ==";
    ddn = await Dynamsoft.DDN.DocumentNormalizer.createInstance();
    ddn.maxCvsSideLength = 9999;
}
const videoS = ref(false)
const waitForVideoElement = () => {
    vid = document.querySelector('video');
    if (vid) {
        console.log("Video element found");
        vid.addEventListener('loadeddata', () => {
            console.log("Video started");
            const overlayElement = document.getElementsByClassName("overlay")[0];
            if (overlayElement) {
                overlayElement.setAttribute("viewBox", `0 0 ${vid.videoWidth} ${vid.videoHeight}`);
                startDetecting();
            } else {
                console.error("Overlay element not found.");
            }
        });
    } else {
        requestAnimationFrame(waitForVideoElement);
    }
}
onMounted(() => {
    initDDN()
    isCameraOpen.value = true;
    startSelectedCamera();
    registerEventsForCropper();
    waitForVideoElement();
})
</script>

<style scoped>
.detectedPolygon {
    stroke: green;
    stroke-width: 2;
    fill: lime;
    opacity: 0.3;
}
</style>