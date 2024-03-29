'use client'
import { CssBaseline, ThemeProvider as ThemeProviderMui } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import themes from '@/themes';
import { useCustomizationStore } from "@/providers/customization-store-provider";

export default function CustomThemeProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const customization = useCustomizationStore((state) => ({ ...state }));

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProviderMui theme={themes(customization)}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProviderMui>
        </AppRouterCacheProvider>
    );
}