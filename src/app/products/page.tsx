"use client"
import ProductsView from '@/components/products/view/products-view';
import useProductsStore from '@/stores/useProductsStorage';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
    const { products, fetchData } = useProductsStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchData()
        }
    }, []);

    return (
        <>
            {products.length ?
                <ProductsView products={products} />
                :
                <Typography>Producs not fount</Typography>
            }
        </>
    );
}