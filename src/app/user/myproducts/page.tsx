"use client"
import Emptyproducts from '@/components/products/EmptyProducts';
import ProductsView from '@/components/products/view/products-view';
import ProductsViewGrid from '@/components/products/view/products-view-grid';
import useProductsStore from '@/stores/useProductsStorage';
import { useEffect } from 'react';

export default function Home() {
    const { myproducts, getMyProducts, loading } = useProductsStore();

    useEffect(() => {
        if (!myproducts) {
            getMyProducts()
        }
    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div> // Aquí puedes usar cualquier tipo de indicador de carga que desees
            ) : (
                <>
                    {myproducts ? (
                        <ProductsViewGrid products={myproducts.products} />
                    ) : (
                        <Emptyproducts />
                    )}
                </>
            )}
        </>
    );
}