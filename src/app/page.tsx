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
        <Grid container md={12} lg={6}>
          <Grid item>
            {products.length ?
              <StepperGalleryPromosProducts products={products} />
              :
              <Emptyproducts />
            }
          </Grid>
          <Grid item>
            {products.length ?
              <StepperGalleryPromosProducts products={products} />
              :
              <Emptyproducts />
            }
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>

  );
}
