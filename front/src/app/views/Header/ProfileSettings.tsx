import { useState, MouseEvent } from 'react'
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { settings } from './constants'
import { NavLink } from 'react-router-dom'
import CurrentUser from './CurrentUser'
import { Styles } from '../../global/types'
import { MESSAGES } from '../../global/messages'

const styles: Styles = {
    icon_button: {
        borderRadius: '5px',
        padding: '2px 10px',
        color: (theme) => theme.palette.common.white,
    },
    menu: { mt: '45px' },
}

const ProfileSettings = (): JSX.Element => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={MESSAGES.TITLE.OPEN_SETTOINGS}>
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={styles.icon_button}
                >
                    <CurrentUser />
                </IconButton>
            </Tooltip>
            <Menu
                sx={styles.menu}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map(({ id, title, href }) => (
                    <MenuItem key={id} onClick={handleCloseUserMenu}>
                        <Typography
                            component={NavLink}
                            variant="body2"
                            to={href}
                        >
                            {title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default ProfileSettings
