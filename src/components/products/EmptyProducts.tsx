import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Image from "next/image";

const Emptyproducts = () => {
    return (
        <Card>
            <CardHeader>
                <Typography>Sin Productos</Typography>
            </CardHeader>
            <CardContent>
                <Image
                    width={300}
                    height={300}
                    src="/assets/icons/shopping.png"
                    alt="Empty products"
                />
            </CardContent>
        </Card>
    );
};

export default Emptyproducts;