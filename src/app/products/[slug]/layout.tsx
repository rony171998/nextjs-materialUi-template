//'use client'
// material-ui
//import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from '../../about/Header/Header';
import Sidebar from '../../about/Sidebar/sidebar';
import { drawerWidth } from '@/stores/constant';
import { useCustomizationStore } from '@/providers/customization-store-provider';
import { MainStyled } from '@/components/mainStyle';

// ==============================|| MAIN LAYOUT ||============================== //

export default async function PageLayout(props: { children: React.ReactNode }) {
  //const theme = useTheme();
  //const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          //bgcolor: theme.palette.background.default,
          //transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      {/* <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} /> */}
      <Sidebar />

      {/* main content */}
      {/* <Main theme={theme} open={leftDrawerOpened}> */}
      <MainStyled open={true}>
        {props.children}
        {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
      </MainStyled>
    </Box>
  );
};
