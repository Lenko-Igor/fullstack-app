import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'

import { ROUTES } from '../../utiles/constants/routes'

export const Logo = () => {
    return (
        <>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to={ROUTES.HOME}
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    ['&:hover']: {
                        color: 'inherit',
                    },
                }}
            >
                LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component={Link}
                to={ROUTES.HOME}
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    ['&:hover']: {
                        color: 'inherit',
                    },
                }}
            >
                LOGO
            </Typography>
        </>
    )
}
