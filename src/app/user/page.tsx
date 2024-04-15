"use client"
import Emptyproducts from '@/components/products/EmptyProducts';
import ProductsView from '@/components/products/view/products-view';
import useProductsStore from '@/stores/useProductsStorage';
import { Container } from '@mui/material';
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
                <Emptyproducts />
            }
        </>
    );
}