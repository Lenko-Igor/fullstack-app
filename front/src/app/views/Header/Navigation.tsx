import { NavLink } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import { PageOption } from './constants'

type Props = {
    pages: PageOption[]
}

export const Navigation = ({ pages }: Props) => {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ id, title, href }) => (
                <NavLink key={id} to={href}>
                    {({ isActive }) => (
                        <Typography
                            variant="body2"
                            sx={{
                                my: 2,
                                color: isActive ? '#f7e213' : '#FFFFFF',
                                p: '8px',
                                fontWeight: 600,
                            }}
                        >
                            {title}
                        </Typography>
                    )}
                </NavLink>
            ))}
        </Box>
    )
}
