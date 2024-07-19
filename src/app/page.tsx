'use client'
import Container from '@mui/material/Container';
import StepperGalleryPromos from '@/components/products/StepperGalleryPromos';
import useProductsStore from '@/stores/useProductsStorage';
import { useEffect } from 'react';
import StepperGalleryPromosProducts from '@/components/products/StepperGalleryPromoProducts';
import Footer from '@/components/Footer';
import Emptyproducts from '@/components/products/EmptyProducts';
import { AppBar, Grid, Toolbar } from '@mui/material';
import Header from './about/Header/Header';
import Sidebar from './about/Sidebar/sidebar';
import { CardGlass, Glass } from '@/themes/glassStyle';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';

export default function Home() {
  const { products, fetchData, loading } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchData()
    }
  }, []);

  return (
    <>
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
      <Container maxWidth='xl'>
        <Glass>
          <CardGlass>
            <ErrorBoundary fallback={<Error />}>
              <StepperGalleryPromos />
              <Grid container spacing={2}>
                {products.length ? (
                  <>
                    <Grid item lg={4}>
                      <StepperGalleryPromosProducts products={products} />
                    </Grid>
                    <Grid item lg={4}>
                      <StepperGalleryPromosProducts products={products} />
                    </Grid>
                    <Grid item lg={4}>
                      <StepperGalleryPromosProducts products={products} />
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Emptyproducts />
                  </Grid>
                )}
              </Grid>
            </ErrorBoundary>
          </CardGlass>
        </Glass>
      </Container>
      <Footer />
    </>
  );
}
