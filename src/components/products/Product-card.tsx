import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from '../utils/format-number';

import Label from '../label/label';
import ColorPreview from '../color-utils/color-preview';
import { Product } from '@/stores/useProductsStorage';

// ----------------------------------------------------------------------

interface Props {
  product: Product
}

export default function ShopProductCard(props: Props) {
  const { product } = props

  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        <Box
          component="img"
          alt={product.title}
          src={product.productImgs[0]}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={product.status} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {product.price && fCurrency(product.price)}
            </Typography>
            &nbsp;
            {fCurrency(product.price)}
          </Typography>
        </Stack>
        <NextLink href={`/products/${product.id}`} passHref>
          <Typography component="a">View Details</Typography>
        </NextLink>
      </Stack>
    </Card>
  );
}

