'use client'
// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { drawerWidth } from '@/stores/constant';

// styles
export const MainStyled = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ open }) => ({
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: useTheme().transitions.create(
        'margin',
        open
            ? {
                easing: useTheme().transitions.easing.easeOut,
                duration: useTheme().transitions.duration.enteringScreen
            }
            : {
                easing: useTheme().transitions.easing.sharp,
                duration: useTheme().transitions.duration.leavingScreen
            }
    ),
    [useTheme().breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        //width: `calc(100% - ${drawerWidth}px)`
    },
    [useTheme().breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [useTheme().breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));