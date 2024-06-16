import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { StyledEngineProvider } from '@mui/material';
import { CustomizationStoreProvider } from '@/providers/customization-store-provider'
import CustomThemeProvider from "./customThemeProvider";
import SnackbarProviderClient from "@/providers/SnackbarProviderClient";
import { ProvidersGoogle } from "@/providers/ProviderGoogle";

export const metadata: Metadata = {
  title: "Smart Mark App",
  description: "Generated by Rony with nextjs app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StyledEngineProvider injectFirst>
            <CustomizationStoreProvider>
              <CustomThemeProvider>
                <SnackbarProviderClient >
                  <ProvidersGoogle>
                    {children}
                  </ProvidersGoogle>
                </SnackbarProviderClient>
              </CustomThemeProvider>
            </CustomizationStoreProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
