'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import Image from 'next/image';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Image
                    src="/assets/images/error-state.png"
                    alt='error page image'
                    height={450}
                    width={400}
                />
                <Typography variant="h4" component="h2" gutterBottom>
                    Oops! Something went wrong
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We are sorry, but an unexpected error occurred.
                </Typography>
                <Button variant="contained" color="primary" onClick={reset} sx={{ mt: 2 }}>
                    Try Again
                </Button>
            </Box>
        </Container>
    );
}
