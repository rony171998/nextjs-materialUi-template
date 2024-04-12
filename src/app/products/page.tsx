"use client"
import ProductsView from '@/components/products/view/products-view';
import { getProducs } from '@/components/utils/getProducts';
import useProductsStore from '@/stores/useProductsStorage';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const revalidate = 3600

export default function Home() {
    const { products, fetchData } = useProductsStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchData()
        }
    }, []);

    console.log(products, 'products')

    return (
        <>
            {products, length ?
                <ProductsView products={products} />
                :
                <Typography>Producs not fount</Typography>
            }
        </>
    );
}