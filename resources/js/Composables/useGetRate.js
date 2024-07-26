import { ref } from "vue";

export function useGetRate() {
    const daysDifference = ref("");
    const returnRates = ref(0);
    const roomRate = [
        {
            id: 1,
            name: "standard",
            rate: [
                {
                    id: 1,
                    person_capacity: 1,
                    room_count: 1,
                    per_night: 150,
                    per_week: 650,
                },
                {
                    id: 2,
                    person_capacity: 2,
                    room_count: 1,
                    per_night: 300,
                    per_week: 750,
                },
                {
                    id: 3,
                    person_capacity: 3,
                    room_count: 1,
                    per_night: 450,
                    per_week: 750,
                },
                {
                    id: 4,
                    person_capacity: 4,
                    room_count: 1,
                    per_night: 600,
                    per_week: 900,
                },
                {
                    id: 5,
                    person_capacity: 5,
                    room_count: 1,
                    per_night: 750,
                    per_week: 900,
                },
                {
                    id: 6,
                    person_capacity: 6,
                    room_count: 2,
                    per_night: 900,
                    per_week: 750,
                },
            ],
        },
        {
            id: 2,
            name: "shared",
            rate: [
                {
                    id: 1,
                    person_capacity: 1,
                    room_count: 1,
                    per_night: 150,
                    per_week: 400,
                },
                {
                    id: 2,
                    person_capacity: 2,
                    room_count: 1,
                    per_night: 300,
                    per_week: 750,
                },
                {
                    id: 3,
                    person_capacity: 3,
                    room_count: 1,
                    per_night: 450,
                    per_week: 750,
                },
                {
                    id: 4,
                    person_capacity: 4,
                    room_count: 1,
                    per_night: 600,
                    per_week: 900,
                },
                {
                    id: 5,
                    person_capacity: 5,
                    room_count: 1,
                    per_night: 750,
                    per_week: 900,
                },
                {
                    id: 6,
                    person_capacity: 6,
                    room_count: 2,
                    per_night: 900,
                    per_week: 750,
                },
            ],
        },
    ];
    const rate = (personCount, roomType, days) => {
        if (days < 7) {
            return roomRate
                .filter((room) => room.name === roomType)
                .flatMap((room) =>
                    room.rate
                        .filter((rate) => rate.person_capacity === personCount)
                        .map((rate) => rate.per_night)
                );
        }
        return roomRate
            .filter((room) => room.name === roomType)
            .flatMap((room) =>
                room.rate
                    .filter((rate) => rate.person_capacity === personCount)
                    .map((rate) => rate.per_week)
            );
    };
    const getDaysDifference = (check_in, check_out) => {
        const checkInDate = new Date(check_in);
        const checkOutDate = new Date(check_out);
        const differenceInTime = checkOutDate - checkInDate;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1; // Convert milliseconds to days
        daysDifference.value = differenceInDays >= 0 ? differenceInDays : 0; // Ensure days are non-negative
    };
    return {
        rate,
        daysDifference,
        getDaysDifference,
    };
}
