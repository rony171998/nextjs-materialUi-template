import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { autoPlay } from 'react-swipeable-views-utils-react-18-fix';
import Image from 'next/image';
import { Stack } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath:
//       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ];

function StepperGallery({ images }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 650, flexGrow: 1 }}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.altText}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box  >
                                <Image
                                    src={step.src as string}
                                    alt={step.altText as string}
                                    //priority={true}
                                    width={700}
                                    height={500}
                                    //layout="responsive"
                                    objectFit='cover'
                                    style={{ borderRadius: '15px' }}
                                />
                            </Box>
                        ) : null}
                    </div>
                )
                )}
            </AutoPlaySwipeableViews>
            <Stack direction={'row'} spacing={2} mt={3} justifyContent={'center'}>
                {images.map((step, index) => {
                    if (index > 4) return null; // Si quieres mostrar solo las primeras 5 imágenes
                    const opacity = Math.max(0, 1 - Math.abs(activeStep - index) * 0.2); // Ajusta el factor multiplicador según lo desees
                    return (
                        <div key={step.altText}>
                            <Box>
                                <Image
                                    src={step.src as string}
                                    alt={step.altText as string}
                                    width={80}
                                    height={80}
                                    style={{
                                        borderRadius: '15px',
                                        border: activeStep === index ? '2px solid green' : '',
                                        opacity: opacity
                                    }}
                                />
                            </Box>
                        </div>
                    );
                })}
            </Stack>


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
                        Next
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
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default StepperGallery;