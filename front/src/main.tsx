import { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './app/Router'
import { theme } from './app/theme'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
