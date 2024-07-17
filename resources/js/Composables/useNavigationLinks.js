import {
    HomeIcon,
    CloudArrowUpIcon,
    CameraIcon,
} from "@heroicons/vue/24/solid";

export function useNavigationLinks() {
    const navLinks = [
        {
            id: "nav-home",
            icon: HomeIcon,
            link: "user.home",
            label: "Home",
        },
        {
            id: "nav-category",
            icon: CameraIcon,
            link: "scan.index",
            label: "Scan",
        },
        {
            id: "nav-calendar",
            icon: CloudArrowUpIcon,
            link: "upload.voucher.index",
            label: "Upload",
        },
    ];
    return { navLinks };
}
