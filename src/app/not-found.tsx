'use client'
import Logo from '@/components/ui-component/Logo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function NotFoundView() {
    const renderHeader = (
        <Box
            component="header"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                lineHeight: 0,
                position: 'fixed',
                p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
            }}
        >
            <Logo />
        </Box>
    );

    return (
        <>
            {renderHeader}

            <Container>
                <Box
                    sx={{
                        py: 12,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Sorry, page not found!
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                        sure to check your spelling.
                    </Typography>
                    <Box my={5}>
                        <Image
                            src="/assets/illustrations/illustration_404.svg"
                            width={360}
                            height={260}
                            alt="imagepagenofount"
                        />
                    </Box>


                    <Link href="/">
                        <Button size="large" variant="contained">
                            Go to Home
                        </Button>
                    </Link>

                </Box>
            </Container>
        </>
    );
}