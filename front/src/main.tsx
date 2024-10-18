import { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './app/Router'
import { theme } from './app/theme'
import { Snackbar } from './app/components/SnackBar'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    autoHideDuration={1200}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    Components={{
                        error: Snackbar('error'),
                        success: Snackbar('success'),
                    }}
                >
                    <Router />
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
)
