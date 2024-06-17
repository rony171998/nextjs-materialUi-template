"use client"
import Emptyproducts from '@/components/products/EmptyProducts';
import ProductsView from '@/components/products/view/products-view';
import useProductsStore from '@/stores/useProductsStorage';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const pathname = usePathname()
    const parts = pathname.split('/');
    const name = parts[parts.length - 1];

    const { products, filterProductsByName } = useProductsStore();

    useEffect(() => {
        filterProductsByName(name)
    }, [name]);

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