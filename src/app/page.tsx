import * as React from 'react';
import Container from '@mui/material/Container';
import ProductsView from '@/components/products/view/products-view';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <ProductsView />
    </Container>
  );
}
