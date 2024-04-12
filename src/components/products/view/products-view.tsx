'use client'
import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

//import { products } from '../../_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductCartWidget from '../product-cart-widget';
import ProductFilters from '../product-filters';
import { Box } from '@mui/material';
import { Product } from '@/stores/useProductsStorage';

// ----------------------------------------------------------------------

interface Props {
  products: Product[] | []
}
export default function ProductsView(props: Props) {
  const { products } = props
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  console.log(products)

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
            />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Box>
  );
}
