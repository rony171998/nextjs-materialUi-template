import * as React from 'react';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useCartStore from '@/stores/useCartStorage';

interface PaymentFormProps {
  formData: {
    firstName: string;
    lastName: string;
    street: string;
    references: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentType: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
  };
}

export default function Review({ formData }: PaymentFormProps) {
  const { cart, getCart, loading } = useCartStore();

  useEffect(() => {
    getCart();
  }, [getCart]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    );
  }

  const address = `${formData.street}, ${formData.references}, ${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;
  const payments = [
    { name: 'Card type:', detail: 'Visa' }, // Assuming Visa as a placeholder, this should come from formData
    { name: 'Card holder:', detail: `${formData.firstName} ${formData.lastName}` },
    { name: 'Card number:', detail: `xxxx-xxxx-xxxx-${formData.cardNumber.slice(-4)}` },
    { name: 'Expiry date:', detail: formData.expirationDate },
  ];

  return (
    <Stack spacing={2}>
      <List disablePadding>
        {cart.map((item) => (
          <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={item.product.title} secondary={`Quantity: ${item.quantity}`} />
            <Typography variant="body2">{(item.product.price * item.quantity).toFixed(2)} USD</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">9.99 USD</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getTotalPrice()} USD
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{`${formData.firstName} ${formData.lastName}`}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {address}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
