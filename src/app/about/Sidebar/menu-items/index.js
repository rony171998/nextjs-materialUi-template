import dashboard from "./dashboard";
import pages from "./pages";
import other from "./other";
import { icons } from "@tabler/icons-react";

const menuUser = {
    id: "user",
    title: "User",
    caption: "Pages Caption",
    type: "group",
    children: [
        {
            id: "user",
            title: "User",
            type: "collapse",
            icon: icons.IconUser,
            children: [
                {
                    id: "addproduct",
                    title: "User",
                    type: "item",
                    url: "/user",
                    target: false,
                },
                {
                    id: "addproduct",
                    title: "Register Product",
                    type: "item",
                    url: "/user/addproduct",
                    target: false,
                },
                {
                    id: "myproduct",
                    title: "My Products",
                    type: "item",
                    url: "/user/myproducts",
                    target: false,
                },
                {
                    id: "myshoping",
                    title: "My Shopping",
                    type: "item",
                    url: "/user/myshopping",
                    target: false,
                },
                {
                    id: "addcategory",
                    title: "Register Category",
                    type: "item",
                    url: "/user/addcategory",
                    target: false,
                },
            ],
        },
    ],
};
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, pages, menuUser, other],
};

export default menuItems;
