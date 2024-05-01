import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Image from "next/image";

const Emptyproducts = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
        //height="100vh"
        >
            <Card>
                <CardHeader>
                    <Typography>Sin Productos</Typography>
                </CardHeader>
                <CardContent>
                    <Image
                        width={250}
                        height={250}
                        src="/assets/icons/shopping.png"
                        alt="Empty products"
                    />
                </CardContent>
            </Card>
        </Box>

    );
};

export default Emptyproducts;