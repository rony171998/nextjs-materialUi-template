import React from 'react';
import { Card, CardContent, Typography, Link, Grid, Stack, Container, Box, ListItemText, ListItem, List } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
    return (
        <Container maxWidth='lg'>
            <Card>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Stack alignItems={'center'} spacing={1}>
                                <CardDetail title='Info' />
                                <Typography variant="body1" gutterBottom>
                                    Valledupar - Colombia
                                </Typography>
                            </Stack>
                            <Stack alignItems={'center'}>
                                <CardDetail title='Curriculum' />
                                <Link href="https://www.canva.com/design/DAFIIFIdRwA/iJ3xZc15-uhYUoMKxaTHKw/view?utm_content=DAFIIFIdRwA&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank" rel="noopener noreferrer">
                                    <Image src="https://cdn-icons-png.flaticon.com/512/3135/3135731.png" alt="" width={54} height={54} />
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Stack alignItems={'center'} spacing={1}>
                                <CardDetail title='Products' />
                                <Link href="https://personaltrainer-crossfit.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <Typography variant="body1">
                                        Personal Trainer
                                    </Typography>
                                </Link>
                                <Link href="https://e-commerce-rony.netlify.app/" target="_blank" rel="noopener noreferrer">
                                    <Typography variant="body1">
                                        E-commerce App
                                    </Typography>
                                </Link>
                                <Link href="https://rickandmorty-rony.netlify.app/" target="_blank" rel="noopener noreferrer">
                                    <Typography variant="body1">
                                        Rick and Morty Wiki
                                    </Typography>
                                </Link>
                                <Link href="https://pokemons-rony.netlify.app/" target="_blank" rel="noopener noreferrer">
                                    <Typography variant="body1">
                                        Pokedex Pokemons
                                    </Typography>
                                </Link>
                            </Stack>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Stack alignItems={'center'} spacing={1}>
                                <CardDetail title='Social' />
                                <Link href="https://www.linkedin.com/in/rony-puche-a80275234/" target="_blank" rel="noopener noreferrer">
                                    <Image src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="" width={54} height={54} />
                                </Link>
                                <Link href="https://github.com/rony171998" target="_blank" rel="noopener noreferrer">
                                    <Image src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="" width={54} height={54} />
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack alignItems={'center'}>
                        <Typography variant="h5" style={{ marginTop: '2rem' }}>
                            Rony Puche web &copy; 2024
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Container>

    );
};

export default Footer;

const CardDetail = ({ title }: { title: string }) => {
    return (
        <Card sx={{ backdropFilter: 'blur(40px)' }}>
            <Box sx={{ p: 2 }}>
                <List sx={{ py: 0 }}>
                    <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                        <ListItemText
                            sx={{
                                py: 0,
                                mt: 0.45,
                                mb: 0.45
                            }}
                            primary={
                                <Typography variant="h4">
                                    {title}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
        </Card>
    )
}

