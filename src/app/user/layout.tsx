//'use client'
// material-ui
import { AppBar, Box, Container, CssBaseline, Toolbar } from '@mui/material';

// project imports
import Header from '../about/Header/Header';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from '../error';
import { CardGlass, Glass } from '@/themes/glassStyle';
import Sidebar from '../about/Sidebar/sidebar';
import SidebarCartShopping from '../about/Sidebar/sidebarCartShopping';
import CartWidget from '@/components/products/product-cart-widget';

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
      <Container maxWidth={'lg'} sx={{ mt: 10 }}>
        <Glass>
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
