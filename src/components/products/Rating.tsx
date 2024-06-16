import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface RatingProductProps {
    initialValue?: number;
    showText?: boolean;
}

export default function RatingProduct({ initialValue, showText = true }: RatingProductProps) {
    const getRandomValue = () => {
        const keys = Object.keys(labels).map(key => parseFloat(key));
        const randomIndex = Math.floor(Math.random() * keys.length);
        return keys[randomIndex];
    };

    const [value, setValue] = React.useState<number | null>(initialValue ?? getRandomValue());
    const [hover, setHover] = React.useState(-1);

    React.useEffect(() => {
        if (initialValue === undefined) {
            setValue(getRandomValue());
        }
    }, [initialValue]);

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {showText && value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}


