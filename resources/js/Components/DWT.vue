<template>
    <div id="dwtcontrolContainer" ref="container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Dynamsoft from 'mobile-web-capture';

const props = defineProps({
    width: String,
    height: String
});
const emit = defineEmits(['onWebTWAINReady']);

const containerID = "dwtcontrolContainer";
const DWObject = ref(null);
const thumbnail = ref(null);
const container = ref(null);

const OnWebTWAINReady = () => {
    DWObject.value = Dynamsoft.DWT.GetWebTwain(containerID);
    if (container.value) {
        const el = container.value;
        if (props.height) {
            DWObject.value.Viewer.height = props.height;
            el.style.height = props.height;
        }
        if (props.width) {
            DWObject.value.Viewer.width = props.width;
            el.style.width = props.width;
        }
    }

    const thumbnailViewerSettings = {
        location: 'left',
        size: '100%',
        columns: 2,
        rows: 3,
        scrollDirection: 'vertical', // 'horizontal'
        pageMargin: 10,
        background: "rgb(255, 255, 255)",
        border: '',
        allowKeyboardControl: true,
        allowPageDragging: true,
        allowResizing: false,
        showPageNumber: true,
        pageBackground: "transparent",
        pageBorder: "1px solid rgb(238, 238, 238)",
        hoverBackground: "rgb(239, 246, 253)",
        hoverPageBorder: "1px solid rgb(238, 238, 238)",
        placeholderBackground: "rgb(251, 236, 136)",
        selectedPageBorder: "1px solid rgb(125,162,206)",
        selectedPageBackground: "rgb(199, 222, 252)"
    };
    thumbnail.value = DWObject.value.Viewer.createThumbnailViewer(thumbnailViewerSettings);
    thumbnail.value.show();
    emit("onWebTWAINReady", DWObject.value, thumbnail.value);
};

onMounted(async () => {
    console.log("on mounted");
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
        OnWebTWAINReady();
    });
    Dynamsoft.DWT.UseLocalService = false;
    Dynamsoft.DWT.ProductKey = "t01898AUAAEzBJt/GDzVUw/bntiNhriOFKAQDJB0Syx2ErlvZ5eg88ASLHcvGl/GLVlDJTJbqCpzCXUWVogfEhEJp+j7Rq2L2+OVkB6e2d6q0d6KDk7ecIs91GLbdduu8ZQIT8FoBPY7DASAHtloK4D3stcECaAFqAGrVAAu4XEX98yllQPKv/2zo4mQHp7Z35gFp40QHJ285Y0B8EDfH1c5bQJCfnBNAC9BLAPtFVgVESoAWoBVAqvP0/ALUhTIF"
    Dynamsoft.DWT.ResourcesPath = "../../../assets/dwt-resources";
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: containerID,
        Width: '300px',
        Height: '400px'
    }];
    Dynamsoft.DWT.Load();
});
</script>

<style scoped>
/* Your styles here */
</style>
