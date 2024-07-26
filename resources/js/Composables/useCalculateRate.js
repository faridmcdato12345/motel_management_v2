import { ref } from "vue";

export function useCalculateRate() {
    const daysDifference = ref("");
    const calculate = (checkIn, checkOut) => {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const timeDifference = date2 - date1;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        daysDifference.value = daysDifference + 1;
    };

    return {
        calculate,
        daysDifference,
    };
}
