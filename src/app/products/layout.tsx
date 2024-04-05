//'use client'
// material-ui
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';

// project imports
import { MainStyled } from '@/components/mainStyle';
import Header from '../about/Header/Header';
import Sidebar from '../about/Sidebar/sidebar';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from '../error';

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
      <Sidebar />

      {/* main content */}
      {/* <Main theme={theme} open={leftDrawerOpened}> */}
      <MainStyled open={true}>
        <ErrorBoundary fallback={<Error />}>
          {props.children}
        </ErrorBoundary>
      </MainStyled>
    </Box>
  );
};
