"use client"
import Emptyproducts from '@/components/products/EmptyProducts';
import ProductsViewGrid from '@/components/products/view/products-view-grid';
import usePurchasesStore from '@/stores/usePurchasesStorage';
import { useEffect } from 'react';

export default function MyShopping() {
    const { purchases, getPurchases, loading } = usePurchasesStore()

    useEffect(() => {
        if (!purchases.length) {
            getPurchases()
        }
    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div> // Aquí puedes usar cualquier tipo de indicador de carga que desees
            ) : (
                <>
                    {purchases ? (
                        <ProductsViewGrid products={purchases} />
                    ) : (
                        <Emptyproducts />
                    )}
                </>
            )}
        </>
    );
}