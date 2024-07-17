import { ref } from "vue";

export function useStartCamera() {
    const video = ref(null);
    const startCamera = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                video.value.srcObject = stream;
                video.value.play();
            } catch (error) {
                console.error("Error accessing the camera:", error);
            }
        } else {
            console.warn("Your browser does not support the MediaDevices API");
        }
    };

    return {
        startCamera,
    };
}
