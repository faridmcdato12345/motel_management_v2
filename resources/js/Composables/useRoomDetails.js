import { ref } from "vue";

export default function useRoomDetails() {
    const error = ref(null);
    const getRoomDetails = async (roomId) => {
        try {
            const response = await axios.get(`/room_voucher_details/${roomId}`);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.value };
        }
    };

    return {
        getRoomDetails,
        error,
    };
}
