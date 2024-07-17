import { ref } from "vue";
export default function useStoreMultiData() {
    const multiData = ref([]);

    const storeMulti = async (data) => {
        try {
            const response = await axios.post("/voucher/store/multi_client");
        } catch (error) {}
    };

    return {};
}
