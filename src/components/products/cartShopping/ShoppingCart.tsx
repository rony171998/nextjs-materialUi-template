'use client';
import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Grid,
    Stack,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import useCartStore from '@/stores/useCartStorage';
import { IconRefresh } from '@tabler/icons-react';

const ShoppingCart = () => {
    const { cart, getCart, loading, deleteProductFromCart, patchProductToCart } = useCartStore();

    useEffect(() => {
        getCart();
    }, [getCart]);

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    if (loading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    const handleDeleteProductInCart = (productId: number) => {
        deleteProductFromCart(productId);
        getCart();
    };

    const handlePatchProductToCart = (productId: number, quantity: number) => {
        patchProductToCart(productId, quantity);
    };

    const handleIncrement = (item) => {
        if (item.quantity < item.product.quantity) {
            handlePatchProductToCart(item.productId, item.quantity + 1);
        }
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            handlePatchProductToCart(item.productId, item.quantity - 1);
        }
    };

    return (
        <Container>
            <Stack direction={'row'} spacing={2} mt={3}>
                <Typography variant="h4" gutterBottom>
                    Shopping Cart
                </Typography>
                <IconButton aria-label="" onClick={getCart}>
                    <IconRefresh />
                </IconButton>
            </Stack>
            <List>
                {cart.map((item) => (
                    <ListItem key={item.id} alignItems="flex-start">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <ListItemText
                                    primary={item.product.title}
                                    secondary={item.product.description}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <ListItemText
                                    primary={`Price`}
                                    secondary={`${item.product.price} €`}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Box display="flex" alignItems="center" justifyContent="flex-end">
                                    <IconButton
                                        onClick={() => handleDecrement(item)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <RemoveIcon color="error" />
                                    </IconButton>
                                    <Typography>{item.quantity}</Typography>
                                    <IconButton
                                        onClick={() => handleIncrement(item)}
                                        disabled={item.quantity >= item.product.quantity}
                                    >
                                        <AddIcon color="success" />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteProductInCart(item.productId)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h6">{getTotalPrice()} €</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                Checkout
            </Button>
        </Container>
    );
};

export default ShoppingCart;
