// assets
import { IconDashboard, IconHome } from "@tabler/icons-react";

// constant
const icons = { IconDashboard, IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: "dashboard",
    title: "Dashboard",
    type: "group",
    children: [
        {
            id: "default",
            title: "Home",
            type: "item",
            url: "/",
            icon: icons.IconHome,
            breadcrumbs: false,
        },
        {
            id: "default",
            title: "products",
            type: "item",
            url: "/products",
            icon: icons.IconDashboard,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
