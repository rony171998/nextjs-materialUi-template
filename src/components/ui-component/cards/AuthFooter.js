// material-ui
import { Link, Typography, Stack } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography
            variant="subtitle2"
            component={Link}
            href="https://ronyportafolio.netlify.app/"
            target="_blank"
            underline="hover"
        >
            Ruuny.Dev
        </Typography>
        <Typography
            variant="subtitle2"
            component={Link}
            href="https://ronyportafolio.netlify.app/"
            target="_blank"
            underline="hover"
        >
            &copy; Ruuny.Dev.com
        </Typography>
    </Stack>
);

export default AuthFooter;
