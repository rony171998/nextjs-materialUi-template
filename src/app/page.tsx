'use client'
import Container from '@mui/material/Container';
import StepperGalleryPromos from '@/components/products/StepperGalleryPromos';
import useProductsStore from '@/stores/useProductsStorage';
import { useEffect } from 'react';
import StepperGalleryPromosProducts from '@/components/products/StepperGalleryPromoProducts';
import Footer from '@/components/Footer';
import Emptyproducts from '@/components/products/EmptyProducts';
import { Grid } from '@mui/material';

export default function Home() {
  const { products, fetchData } = useProductsStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchData()
    }
  }, []);

  return (
    <>
      <Container maxWidth="xl">
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
