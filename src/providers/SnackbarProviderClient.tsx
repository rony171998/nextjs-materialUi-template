'use client'
import { SnackbarProvider } from "notistack"

const SnackbarProviderClient = ({ children }) => {
    return (
        <SnackbarProvider maxSnack={3}>
            {children}
        </SnackbarProvider >
    )
}

export default SnackbarProviderClient
