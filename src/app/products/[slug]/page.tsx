'use client'
import { products } from '@/components/_mock/products';
import ColorPreview from '@/components/color-utils/color-preview';
import Footer from '@/components/Footer';
import { GridTileImage } from '@/components/tile';
import { fCurrency } from '@/components/utils/format-number';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SlideshowLightbox } from 'lightbox.js-react'
// pages/[productId].js

import { Suspense, useState } from 'react';
import StepperGallery from '@/components/products/StepperGallery';

export default function ProductPage() {
    const pathname = usePathname()
    const parts = pathname.split('/');
    const productId = parts[parts.length - 1];
    const product = products[0];
    console.log(product)
    const images = products.map(imageProduct => ({
        src: imageProduct.cover,
        altText: imageProduct.name
    }))
    return (
        <Box sx={{ mx: 'auto', maxWidth: '100%', px: 4 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    borderRadius: 'lg',
                    border: '1px solid #E2E8F0',
                    backgroundColor: 'white',
                    p: { xs: 8, md: 12 },
                    gap: { lg: 8 },
                    '& .dark': {
                        borderColor: '#4B5563',
                        backgroundColor: 'black',
                    },
                }}
            >
                <Box sx={{ flex: { xs: 'none', lg: '1 1 0%' }, width: 'full', lg: { flex: 'none' } }}>
                    <Suspense
                        fallback={
                            <Box
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '1 / 1',
                                    maxHeight: 450,
                                    overflow: 'hidden',
                                }}
                            />
                        }
                    >
                        <StepperGallery images={images} />
                    </Suspense>
                </Box>

                <Box sx={{ flex: { xs: 'none', lg: '1 1 0%' } }}>
                    <ProductDescription product={product} />
                </Box>
            </Box>

            <Suspense>
                <RelatedProducts relatedProducts={products} />
            </Suspense>
        </Box>
    );
}

export function Gallery({ images }) {
    console.log(images);
    const imageIndex = 0; // Actualizar según sea necesario
    const nextImageIndex = (imageIndex + 1) % images.length;
    const previousImageIndex = (imageIndex === 0) ? (images.length - 1) : (imageIndex - 1);

    const buttonClassName = 'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

    return (
        <Box>
            {/* <SlideshowLightbox lightboxIdentifier="lightbox1" framework="next" images={images}>
                    {images.map(image => (
                        <Image
                            src={image.src}
                            alt={image.altText}
                            height={500}
                            width={500}
                            data-lightboxjs="lightbox1"
                            quality={80}
                        />
                    ))}
                </SlideshowLightbox> */}

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
                <ul
                //className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0"
                >
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
// export async function getServerSideProps({ params }) {
//     // Aquí obtienes los datos del producto según el ID
//     const { productId } = params;
//     // Supongamos que aquí obtienes los datos del producto desde una API o una base de datos
//     const product = { id: productId, name: 'Producto 1', price: '$10' };
//     return { props: { product } };
// }

function RelatedProducts({ relatedProducts }) {
    //const relatedProducts = await getProductRecommendations(id);

    //if (!relatedProducts.length) return null;

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
                Related Products
            </Typography>
            <Grid container spacing={4}>
                {relatedProducts.map((product, index) => {
                    if (index > 4) return
                    return (
                        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Link href={`/products/${product.id}`}>
                                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
                                    <Image
                                        src={product.cover}
                                        alt={product.name}
                                        width={250}
                                        height={250}
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {product.priceSale}{' '}{product.price}{' '}
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

function ProductDescription({ product }) {
    const buttonClassName = 'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

    return (
        <>
            <Box sx={{ mb: 6, borderBottom: '1px solid', pb: 6, borderColor: '#E2E8F0', flex: 'none' }}>
                <Typography variant="h1" sx={{ mb: 2, fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
                <Box
                    sx={{
                        display: 'inline-block',
                        backgroundColor: '#3B82F6',
                        borderRadius: 'full',
                        p: 1,
                        mr: 'auto',
                        mb: 2,
                        fontSize: '0.875rem',
                        color: 'white',
                    }}
                >
                    {product.price}
                </Box>
            </Box>
            <ColorPreview colors={product.colors} />

            <Typography variant="subtitle1">
                <Typography
                    component="span"
                    variant="body1"
                    sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                    }}
                >
                    {product.priceSale && fCurrency(product.priceSale)}
                </Typography>
                &nbsp;
                {fCurrency(product.price)}
            </Typography>

            <Suspense fallback={null}>
                <Box sx={{ mt: 2 }}>
                    <Button className={buttonClassName} variant='contained' sx={{ mr: 2 }}>
                        Añadir al carrito
                    </Button>
                    <Button variant='outlined'>Comprar ahora</Button>
                </Box>
            </Suspense>
        </>
    );
}


