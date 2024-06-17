//'use client'
// material-ui
import { AppBar, Box, Container, CssBaseline, Toolbar } from '@mui/material';

// project imports
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from '../../error';
import { CardGlass, Glass } from '@/themes/glassStyle';
import CartWidget from '@/components/products/product-cart-widget';
import SidebarCartShopping from '../../about/Sidebar/sidebarCartShopping';
import Header from '@/app/about/Header/Header';
import Sidebar from '@/app/about/Sidebar/sidebar';

// ==============================|| MAIN LAYOUT ||============================== //

export default async function PageLayout(props: { children: React.ReactNode }) {

  return (
    <Box>
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
      <SidebarCartShopping />

      {/* main content */}
      <Container maxWidth='xl'>
        <Glass sx={{ ml: 5 }}>
          <CardGlass>
            <ErrorBoundary fallback={<Error />}>
              {props.children}
            </ErrorBoundary>
          </CardGlass>
        </Glass>
      </Container>
      <CartWidget />
    </Box>
  );
};
