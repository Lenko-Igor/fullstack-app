import { PropsWithChildren } from 'react'
import { Avatar, Theme } from '@mui/material'

import { StyleProps } from '../../global/types'

type Props = PropsWithChildren<{
    name: string
    src: string
    size: 'small' | 'medium' | 'large'
    sx?: StyleProps
    component?: React.ElementType
}>
const getBackground = (isEmpty: boolean) =>
    isEmpty
        ? (theme: Theme) =>
              `linear-gradient(124deg, ${theme.palette.common.black} -29.1%, ${theme.palette.primary.main} 100%)`
        : 'transparent'
const styles = {
    small: { width: 40, height: 40, fontSize: 22 },
    medium: { width: 56, height: 56, fontSize: 32 },
    large: { width: 72, height: 72, fontSize: 46 },
}

export const UserAvatar = ({
    name,
    src,
    size,
    component = 'div',
    sx = {},
    children,
}: Props): JSX.Element => {
    return (
        <Avatar
            alt={name}
            src={src}
            component={component}
            sx={{ ...styles[size], ...sx, background: getBackground(!src) }}
        >
            <>
                {!src && name.charAt(0).toUpperCase()}
                {children}
            </>
        </Avatar>
    )
}
