import Link from "next/link";

// material-ui
import { ButtonBase } from "@mui/material";

// project imports
import Logo from "@/components/ui-component/Logo";
import { useCustomizationStore } from "@/providers/customization-store-provider";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const defaultId = useCustomizationStore(state => state.defaultId);
    const dispatch = useCustomizationStore(state => state.setMenuOpen);
    return (
        <Link href="/">
            <ButtonBase
                disableRipple
                onClick={() => dispatch({ id: defaultId })}
            >
                <Logo />
            </ButtonBase>
        </Link>
    );
};

export default LogoSection;
