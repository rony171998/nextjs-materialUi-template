import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Stack,
    Grid,
} from '@mui/material';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
}

interface ProductInCart {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    status: string;
    product: Product;
}

interface Cart {
    id: number;
    userId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    productsinCarts: ProductInCart[];
}

interface Order {
    id: number;
    cartId: number;
    userId: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    cart: Cart;
}

const Orders: React.FC<{ orders: Order[] }> = ({ orders }) => {
    return (
        <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            {orders.map((order) => (
                <Grid
                    item
                    xs={12}
                    sm={5}
                    lg={12}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderRight: { sm: 'none', md: '1px solid' },
                        borderColor: { sm: 'none', md: 'divider' },
                        alignItems: 'start',
                        pt: 4,
                        px: 10,
                        gap: 4,
                    }}
                    key={order.id}
                >
                    <Box mb={4}>
                        <Typography variant="h6">Order ID: {order.id}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Order Date: {new Date(order.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Total Price: {order.totalPrice}  USD
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Status: {order.status}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <List>
                            {order.cart.productsinCarts.map((item) => (
                                <ListItem key={item.id}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <ListItemText
                                                primary={item.product.title}
                                                secondary={item.product.description}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="body2">
                                                Quantity: {item.quantity}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="body2">
                                                Price: {(item.product.price * item.quantity).toFixed(2)}  USD
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default Orders;
