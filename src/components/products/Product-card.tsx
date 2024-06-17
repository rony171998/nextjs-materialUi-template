import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconShoppingCart } from '@tabler/icons-react';

import { fCurrency } from '../utils/format-number';
import Label from '../label/label';
import RatingProduct from './Rating';
import { Product } from '@/stores/useProductsStorage';

// ----------------------------------------------------------------------

interface Props {
  product: Product;
}

export default function ShopProductCard(props: Props) {
  const { product } = props;

  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {/* {product.status} */}
      OFF
    </Label>
  );

  return (
    <Card sx={{ maxWidth: 300, m: 'auto' }}>
      <Link
        component={NextLink}
        href={`/products/${product.id}`}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.status && renderStatus}
          <Box
            component="img"
            alt={product.title}
            src={
              product.productImgs.length
                ? product.productImgs[0]?.imgUrl
                : '/assets/images/imagenotfound.png'
            }
            sx={{
              top: 0,
              width: 1,
              height: 1,
              objectFit: 'contain',
              position: 'absolute',
            }}
          />
        </Box>
      </Link>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Link
          component={NextLink}
          href={`/products/${product.id}`}
          color="inherit"
          underline="hover"
          variant="subtitle2"
          noWrap
        >
          {product.title}
        </Link>

        <Stack direction="row" alignItems="center" spacing={1}>
          <RatingProduct />
          <Typography variant="body2" color="text.secondary">
            ({product.price})
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {product.price ? fCurrency(product.price) : null}
            </Typography>
            &nbsp;
            {fCurrency(product.price)}
          </Typography>
          <NextLink href={`/products/${product.id}`} passHref>
            <Button variant="contained" color="primary">
              <IconShoppingCart />
            </Button>
          </NextLink>
        </Stack>
      </Stack>
    </Card>
  );
}
