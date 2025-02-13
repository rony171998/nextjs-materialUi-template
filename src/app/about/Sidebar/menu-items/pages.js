// assets
import { IconKey } from "@tabler/icons-react";

// constant
const icons = {
    IconKey,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: "pages",
    title: "Pages",
    caption: "Pages Caption",
    type: "group",
    children: [
        {
            id: "authentication",
            title: "Authentication",
            type: "collapse",
            icon: icons.IconKey,

            children: [
                {
                    id: "login3",
                    title: "Login",
                    type: "item",
                    url: "/auth/login",
                    target: false,
                },
                {
                    id: "register3",
                    title: "Register",
                    type: "item",
                    url: "/auth/register",
                    target: false,
                },
            ],
        },
    ],
};

export default pages;
