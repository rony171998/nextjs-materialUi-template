'use client'
import Container from '@mui/material/Container';
import StepperGalleryPromos from '@/components/products/StepperGalleryPromos';
import useProductsStore from '@/stores/useProductsStorage';
import { useEffect } from 'react';
import StepperGalleryPromosProducts from '@/components/products/StepperGalleryPromoProducts';
import Footer from '@/components/Footer';
import Emptyproducts from '@/components/products/EmptyProducts';
import { AppBar, Grid, InputAdornment, OutlinedInput, Toolbar } from '@mui/material';
import Header from './about/Header/Header';
import { IconSearch } from '@tabler/icons-react';

export default function Home() {
  const { products, fetchData } = useProductsStore();

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
      <Container maxWidth="xl" sx={{ mt: 10 }}>
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
      </Container>
      <Footer />
    </>

  );
}
