"use client"
import ProductsView from '@/components/products/view/products-view';
import { getProducs } from '@/components/utils/getProducts';
import useProductsStore from '@/stores/useProductsStorage';
import { useEffect, useState } from 'react';

export const revalidate = 3600

export default function Home() {
    const { products, fetchData } = useProductsStore();
    // const [products, setProducts] = useState([])

    useEffect(() => {
        if (products.length === 0) {
            //getDataProducts(); // Llama a la función fetchData cuando se monta la página
            fetchData()
        }
    }, []);

    // const getDataProducts = async () => {
    //     const data = await getProducs()
    //     console.log(data);
    //     if (data.products.length) {
    //         setProducts(data.products)
    //     }
    // }
    return (
        <ProductsView products={products} />
    );
}