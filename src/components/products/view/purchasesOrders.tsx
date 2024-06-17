import * as React from 'react';
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <Container>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            {orders.map((order) => (
                <Accordion key={order.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${order.id}-content`}
                        id={`panel${order.id}-header`}
                    >
                        <Typography variant="h6">Order ID: {order.id}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Order Date: {new Date(order.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Total Price: {order.totalPrice} USD
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
                                                    Price: {(item.product.price * item.quantity).toFixed(2)} USD
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Orders;
