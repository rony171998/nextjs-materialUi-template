//'use client'
// material-ui
import { AppBar, Box, CssBaseline, Toolbar } from '@mui/material';

// project imports
import { MainStyled } from '@/components/mainStyle';
import Header from '../about/Header/Header';
import Sidebar from '../about/Sidebar/sidebar';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from '../error';
import { CardGlass, Glass } from '@/themes/glassStyle';

// ==============================|| MAIN LAYOUT ||============================== //

export default async function PageLayout(props: { children: React.ReactNode }) {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Glass>
        <CardGlass>
          <MainStyled open={true}>
            <ErrorBoundary fallback={<Error />}>
              {props.children}
            </ErrorBoundary>
          </MainStyled>
        </CardGlass>
      </Glass>
    </Box>
  );
};
