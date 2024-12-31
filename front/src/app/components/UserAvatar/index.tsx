import { Avatar } from '@mui/material'

type Props = {
    name: string
    src: string
    size: 'small' | 'medium' | 'large'
}

export const UserAvatar = ({ name, src, size }: Props): JSX.Element => {
    const sx = {
        small: { width: 40, height: 40, fontSize: 22 },
        medium: { width: 56, height: 56, fontSize: 32 },
        large: { width: 72, height: 72, fontSize: 46 },
    }

    return (
        <Avatar alt={name} src={src} sx={{ ...sx[size] }}>
            {!src && name.charAt(0).toUpperCase()}
        </Avatar>
    )
}
