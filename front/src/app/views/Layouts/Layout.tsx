import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export const Layout = (): JSX.Element => {
    return (
        <Box>
            <h1>Layout</h1>
            <Outlet />
        </Box>
    )
}
