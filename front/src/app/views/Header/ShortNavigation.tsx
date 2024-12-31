import { useState, MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import { PageOption } from './constants'

type Props = {
    pages: PageOption[]
}

const ShortNavigation = ({ pages }: Props): JSX.Element => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
            }}
        >
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                {pages.map(({ id, title, href }) => (
                    <MenuItem key={id} onClick={handleCloseNavMenu}>
                        <Typography
                            component={NavLink}
                            to={href}
                            sx={{ textAlign: 'center' }}
                        >
                            {title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default ShortNavigation
