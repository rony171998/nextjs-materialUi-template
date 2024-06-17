'use client'
import { useState, useEffect } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Container, Fade, Typography, AppBar, Toolbar, Button, Card, Modal, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    direccion_remitente: string;
    direccion_destinatario: string[];
};

const Map = (props: Props) => {
    const { isOpen, setIsOpen, direccion_remitente, direccion_destinatario } = props;
    const [directions, setDirections] = useState(null);
    const [originCoordinates, setOriginCoordinates] = useState<null | { lat: number, lng: number }>(null);
    const [destinCoordinates, setDestinCoordinates] = useState<null | [{ lat: number, lng: number }]>(null);
    const [mapCenter, setMapCenter] = useState(null)

    const handleLoad = async () => {
        try {
            const originCoordinates = await geocodeAddress(direccion_remitente);

            if (originCoordinates) {
                setOriginCoordinates(originCoordinates);
                setMapCenter(originCoordinates);

                const destinationCoordinates = await Promise.all(direccion_destinatario.map(geocodeAddress));
                setDestinCoordinates(destinationCoordinates)
                if (destinationCoordinates.every(coord => coord !== null)) {
                    const directionsService = new window.google.maps.DirectionsService();
                    const waypoints = destinationCoordinates.map(coord => ({ location: coord, stopover: true }));

                    directionsService.route({
                        origin: originCoordinates,
                        waypoints,
                        destination: destinationCoordinates[0], // Choose a destination as the last point
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    },
                        (result, status) => {
                            if (status === window.google.maps.DirectionsStatus.OK) {
                                setDirections(result);
                            }
                        }
                    );
                }
            } else {
                handleClose()
            }
        } catch (error: any) {
            console.error(error)
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    useEffect(() => {
        if (isOpen) {
            handleLoad();
        }
    }, [isOpen, direccion_remitente, direccion_destinatario]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Card>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MAP
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    <Button variant="contained" onClick={() => handleOpenMap(originCoordinates, destinCoordinates)}>
                        Ver en google maps
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                        Close
                    </Button>
                </Stack>
            </Toolbar>
            <Card>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '50vh' }}
                    zoom={6}
                    onLoad={handleLoad}
                    options={{ gestureHandling: 'cooperative' }}
                    center={mapCenter}
                >
                    {directions && <DirectionsRenderer directions={directions} />}
                </GoogleMap>
            </Card>
        </Card>
    );
};

export default Map;

const VITE_API_KEY_MAP = process.env.NEXT_API_KEY_MAP

const handleOpenMap = (startCoors, endCoors) => {
    // Coordenadas de inicio
    const startLat = startCoors.lat;
    const startLng = startCoors.lng;

    // Coordenadas de destino (primero en el array)
    const firstEndLat = endCoors[0].lat;
    const firstEndLng = endCoors[0].lng;

    // Construir una cadena de destinos intermedios (si hay más de uno)
    const waypoints = endCoors.slice(1).map(coors => `${coors.lat},${coors.lng}`).join('|');

    // URL de Google Maps con parámetros de ruta y destinos
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${firstEndLat},${firstEndLng}&waypoints=${waypoints}&maptype=roadmap`;

    // Abrir enlace en una nueva pestaña
    window.open(mapUrl, '_blank');
};

const geocodeAddress = async (address: string) => {
    try {
        const apiKey = VITE_API_KEY_MAP;
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error(data.error_message);
        }
    } catch (error: any) {
        console.error('Error al geocodificar la dirección:', error);
        enqueueSnackbar(error.message, { variant: 'error', preventDuplicate: true });
        return error;
    }
};

