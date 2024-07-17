import axios from "axios";
import { ref } from "vue";

export default function useData() {
    const items = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const addMotelUser = async (url) => {
        try {
            const response = await axios.post(url);
            return { success: true, data: response.data };
        } catch (error) {
            error.value = error.response?.data?.message || "An error occurred";
            return { success: false, error: error.value };
        }
    };

    const fetchItem = async (url) => {
        try {
            const response = await axios.get(url);
            return { success: true, data: response.data };
        } catch (error) {
            error.value = error.response?.data?.message || "An error occurred";
            return { success: false, error: error.value };
        }
    };

    const storeItem = async (url, item) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await axios.post(url, item);
            isLoading.value = false;
            return { success: true, data: response.data };
        } catch (error) {
            isLoading.value = false;
            error.value = error.response?.data?.message || "An error occurred";
            return { success: false, error: error.value };
        }
    };

    const updateItem = async (url, item) => {
        try {
            const response = await axios.patch(url, item);
            return { success: true, data: response.data };
        } catch (error) {
            error.value = error.response?.data?.message || "An error occurred";
            return { success: false, error: error.value };
        }
    };
    return {
        isLoading,
        error,
        storeItem,
        fetchItem,
        updateItem,
        addMotelUser,
    };
}
