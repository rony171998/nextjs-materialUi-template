"use client";
import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from "@mui/material";

// project imports

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useCustomizationStore } from "@/providers/customization-store-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";
// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const pathname = usePathname();
    const borderRadius = useCustomizationStore(state => state.borderRadius);
    const isOpen = useCustomizationStore(state => state.isOpen);
    const setMenuOpen = useCustomizationStore(state => state.setMenuOpen);
    const setMenu = useCustomizationStore(state => state.setMenu);
    const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
                height: isOpen.findIndex(id => id === item?.id) > -1 ? 8 : 6,
            }}
            fontSize={level > 0 ? "inherit" : "medium"}
        />
    );

    let itemTarget = "_self";
    if (item.target) {
        itemTarget = "_blank";
    }

    let listItemProps = {
        component: forwardRef((props, ref) => (
            <Link ref={ref} {...props} href={item.url} target={itemTarget} />
        )),
    };
    if (item?.external) {
        listItemProps = { component: "a", href: item.url, target: itemTarget };
    }

    const itemHandler = (id: any) => {
        setMenuOpen(id);
        if (matchesSM) setMenu(false);
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split("/")
            .findIndex(id => id === item.id);
        if (currentIndex > -1) {
            setMenuOpen(item.id);
        }
        // eslint-disable-next-line
    }, [pathname]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${borderRadius}px`,
                mb: 0.5,
                alignItems: "flex-start",
                backgroundColor:
                    level > 1 ? "transparent !important" : "inherit",
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
            }}
            selected={isOpen.findIndex(id => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
                {itemIcon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={
                            isOpen.findIndex(id => id === item.id) > -1
                                ? "h5"
                                : "body1"
                        }
                        color="inherit"
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography
                            variant="caption"
                            sx={{ ...theme.typography.subMenuCaption }}
                            display="block"
                            gutterBottom
                        >
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={
                        item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>
                    }
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
};

export default NavItem;
