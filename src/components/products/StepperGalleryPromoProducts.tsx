'use client'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils-react-18-fix';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/stores/useProductsStorage';
import { useRouter } from 'next/navigation';
import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

type Props = {
    products: Product[] | []
}

function StepperGalleryPromosProducts(props: Props) {
    const products = props.products
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = products.length;
    const router = useRouter()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (product: number) => {
        setActiveStep(product);
    };

    console.log(products)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {products.map((product, index) => (
                    <div key={product.id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar>
                                            {product.title.at(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertRoundedIcon />
                                        </IconButton>
                                    }
                                    title={product.title}
                                    subheader={product.updatedAt}
                                />
                                <Image
                                    //'https://mybucket-smart-mark.s3.us-east-2.amazonaws.com/Captura+de+pantalla_20221026_150539.png'
                                    src={product.productImgs.length ? product.productImgs[0]?.imgUrl : '/assets/images/imagenotfount.png'}
                                    alt={product.title}
                                    priority={true}
                                    width={1}
                                    height={1}
                                    layout="responsive"
                                    style={{ borderRadius: '15px' }}
                                    onClick={() => router.push('/products/' + product.id)}
                                />
                            </Card>

                        ) : null}
                    </div>
                )
                )}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}

export default StepperGalleryPromosProducts;