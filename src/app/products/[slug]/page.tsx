'use client'
import { products as productss } from '@/components/_mock/products';
import ColorPreview from '@/components/color-utils/color-preview';
import Footer from '@/components/Footer';
import { GridTileImage } from '@/components/tile';
import { fCurrency } from '@/components/utils/format-number';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// pages/[productId].js
import StepperGallery from '@/components/products/StepperGallery';
import RatingProduct from '@/components/products/Rating';
import useProductsStore, { Product } from '@/stores/useProductsStorage';
import { useEffect } from 'react';
import useCartStore from '@/stores/useCartStorage';
import Emptyproducts from '@/components/products/EmptyProducts';

export default function ProductPage() {
    const pathname = usePathname()
    const parts = pathname.split('/');
    const productId = parts[parts.length - 1];

    const { products, fetchData, loading } = useProductsStore()

    useEffect(() => {
        fetchData()
    }, [])

    const product = products.find(product => product.id == productId)

    const images = product?.productImgs.map(imageProduct => ({
        src: imageProduct.imgUrl,
        altText: product.title
    }))

    return (
        <>
            {loading ? (
                <div>Loading...</div> // Aquí puedes usar cualquier tipo de indicador de carga que desees
            ) : (
                <>
                    {product ? (
                        <>
                            <Stack direction={'row'} spacing={3} mt={10}>
                                <StepperGallery images={images} />
                                <ProductDescription product={product} />
                            </Stack>

                            <RelatedProducts relatedProducts={products} />
                        </>
                    ) : (
                        <Emptyproducts />
                    )}
                </>
            )}
        </>

    );
}
function ProductDescription({ product }: { product: Product }) {
    const { addProductToCart, loading } = useCartStore()

    const handleAddProductToCart = (id: number, quiantity: number) => {
        console.log(id, quiantity, 'addProductToCart')
        addProductToCart(product.id, 1)
    }
    return (
        <Stack>
            <Box sx={{ mb: 6, mt: 15, borderBottom: '1px solid', pb: 6, borderColor: '#E2E8F0', flex: 'none' }}>
                <Typography variant="h1" sx={{ mb: 2, fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {product.title}
                </Typography>
                <RatingProduct />
                <Typography
                    component="span"
                    variant="body1"
                >
                    Description: {product.description}
                </Typography>
            </Box>
            <ColorPreview colors={["black","white","red","blue"]} />
            <Typography
                component="span"
                variant="body1"
            >
                Stock: {product.quantity}
            </Typography>
            <Typography variant="subtitle1">
                <Typography
                    component="span"
                    variant="body1"
                    sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                    }}
                >
                    Price: {product.price}
                </Typography>
                &nbsp;
                {fCurrency(product.price) + ' USD'}
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Button variant='contained' sx={{ mr: 2 }}
                    onClick={() => handleAddProductToCart(product.id, 1)}
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> : 'Add to cart'}
                </Button>
                <Button variant='outlined'
                    onClick={() => handleAddProductToCart(product.id, 1)}
                    disabled={loading}
                >
                    Buy now
                </Button>
            </Box>
        </Stack>
    );
}

function Gallery({ images }) {
    console.log(images);
    const imageIndex = 0; // Actualizar según sea necesario
    const nextImageIndex = (imageIndex + 1) % images.length;
    const previousImageIndex = (imageIndex === 0) ? (images.length - 1) : (imageIndex - 1);

    const buttonClassName = 'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

    return (
        <Box>
            <Box  >

                {images[imageIndex] && (
                    <Image
                        src={images[imageIndex].src as string}
                        alt={images[imageIndex].altText as string}
                        priority={true}
                        width={500}
                        height={500}
                    //layout="responsive"
                    />
                )}
            </Box>

            {images.length > 1 ? (
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: -5 }}>
                    <Box sx={{ mx: 'auto', display: 'flex', alignItems: 'center', borderRadius: 'full', border: '1px solid', borderColor: 'white', bg: 'rgba(255, 255, 255, 0.8)' }}>
                        <Link href="#" aria-label="Previous product image" className={buttonClassName}>
                            <IconArrowLeft />
                        </Link>
                        <Box sx={{ mx: 1, width: '1px', height: '1.5rem', bg: 'neutral.500' }} />
                        <Link href="#" aria-label="Next product image" className={buttonClassName}>
                            <IconArrowRight />
                        </Link>
                    </Box>
                </Box>
            ) : null}

            {images.length > 1 ? (
                <ul >
                    <Stack direction={'row'}>
                        {images.map((image, index) => {
                            if (index > 5) return
                            const isActive = index === imageIndex;
                            //const imageSearchParams = new URLSearchParams(searchParams.toString());

                            //imageSearchParams.set('image', index.toString());

                            return (
                                <li key={image.src} className="h-20 w-20">
                                    <Link
                                        aria-label="Enlarge product image"
                                        //href={createUrl(pathname, imageSearchParams)}
                                        href={'/'}
                                        scroll={false}
                                        className="h-full w-full"
                                    >
                                        <GridTileImage
                                            alt={image.altText}
                                            src={image.src}
                                            width={80}
                                            height={80}
                                            active={isActive}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </Stack>
                </ul>
            ) : null}

        </Box>
    );
}


function RelatedProducts({ relatedProducts }) {
    //const relatedProducts = await getProductRecommendations(id);

    //if (!relatedProducts.length) return null;

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
                Related Products
            </Typography>
            <Grid container spacing={4}>
                {relatedProducts.map((product: Product, index) => {
                    if (index > 4) return
                    return (
                        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Link href={`/products/${product.id}`}>
                                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
                                    <Image
                                        src={product.productImgs[0].imgUrl}
                                        alt={product.title}
                                        width={250}
                                        height={250}
                                    //style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            p: 2,
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {product.price}{' '}{product.price}{' '}
                                            {'USD'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}

