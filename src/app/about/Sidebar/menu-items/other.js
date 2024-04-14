// assets
import { IconBrandChrome, IconHelp } from "@tabler/icons-react";

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: "sample-docs-roadmap",
    type: "group",
    children: [
        {
            id: "about",
            title: "Sample about",
            type: "item",
            url: "/about",
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
        {
            id: "sample-page",
            title: "Sample Page",
            type: "item",
            url: "/sample-page",
            icon: icons.IconBrandChrome,
            breadcrumbs: false,
        },
    ],
};

export default other;
