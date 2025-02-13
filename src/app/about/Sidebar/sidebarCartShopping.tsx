'use client'
import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Drawer, Stack, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import LogoSection from "../LogoSection";
import { drawerWidthShippingCart } from "@/stores/constant";
import { useCustomizationStore } from "@/providers/customization-store-provider";
import ShoppingCart from "@/components/products/cartShopping/ShoppingCart";

// ==============================|| SIDEBAR DRAWER ||============================== //

const SidebarCartShopping = () => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const drawerOpen = useCustomizationStore(state => state.openedCart);
    const setOpenedMenu = useCustomizationStore(state => state.setMenu);
    const drawerToggle = () => {
        setOpenedMenu(!drawerOpen);
    };
    const drawer = (
        <>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd
                            ? "calc(100vh - 56px)"
                            : "calc(100vh - 88px)",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                    }}
                >
                    <ShoppingCart />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <ShoppingCart />
                </Box>
            </MobileView>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? drawerWidthShippingCart : "auto",
            }}
        >
            <Drawer
                variant={"persistent"}
                anchor="right"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: drawerWidthShippingCart,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: "none",
                        top: "88px",
                    },
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

SidebarCartShopping.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object,
};

export default SidebarCartShopping;
