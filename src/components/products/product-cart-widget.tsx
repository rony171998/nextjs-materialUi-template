'use client'
import Badge from '@mui/material/Badge';
import Iconify from '../iconify';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useCustomizationStore } from '@/providers/customization-store-provider';
import useCartStore from '@/stores/useCartStorage';
import { useEffect } from 'react';


// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: `0 20px 40px -4px`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.92 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const setMenuCart = useCustomizationStore(state => state.setMenuCart);
  const { cart, getCart } = useCartStore()

  useEffect(() => getCart(), [])

  return (
    <StyledRoot onClick={() => setMenuCart(true)}>
      <Badge showZero badgeContent={cart.length} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={32} height={32} />
      </Badge>
    </StyledRoot>
  );
}
