'use client'
import PropTypes from "prop-types";
import NextLink from 'next/link';

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, InputAdornment, OutlinedInput } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection/ProfileSection";
import NotificationSection from "./NotificationSection/NotificationSection";

// assets
import { IconMenu2, IconSearch } from "@tabler/icons-react";
import { useCustomizationStore } from "@/providers/customization-store-provider";
import Link from "next/link";
import { useState } from "react";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const [valueSearch, setValueSearch] = useState('')
    const theme = useTheme();
    const leftDrawerOpened = useCustomizationStore((state) => state.opened)
    const setOpenedMenu = useCustomizationStore((state) => state.setMenu)
    const handleLeftDrawerToggle = () => {
        setOpenedMenu(!leftDrawerOpened)
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: "flex",
                    [theme.breakpoints.down("md")]: {
                        width: "auto",
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
                >
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            transition: "all .2s ease-in-out",
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            "&:hover": {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                            },
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <OutlinedInput
                sx={{ width: '30%', mx: '30%' }}
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder="Search profile options"
                endAdornment={
                    <InputAdornment position="start">
                        <Link
                            component={NextLink}
                            href={valueSearch == '' ? '/search/1' : `/search/${valueSearch}`}
                            color="inherit"
                            underline="hover"
                            variant="subtitle2"
                            noWrap
                        >
                            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </Link>
                    </InputAdornment>
                }
            />

            {/* header search */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
