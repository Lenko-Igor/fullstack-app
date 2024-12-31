import { useEffect, useRef } from 'react'
import { Button, Stack, Typography } from '@mui/material'

import { useUserStore } from '../../store/user.store'

const ProfilePage = () => {
    const $inp = useRef<HTMLInputElement>(null)
    const { currentUser } = useUserStore((state) => state)

    useEffect(() => {
        if ($inp.current) {
            console.log($inp.current)
        }
    }, [$inp])

    return (
        <Stack>
            <Typography variant="h1">ProfilePage</Typography>
            <Typography variant="h2">User: {currentUser.name}</Typography>
            <Typography variant="h3">Email: {currentUser.email}</Typography>
            <Button variant="contained" component="label">
                Upload avatar
                <input
                    ref={$inp}
                    type="file"
                    hidden
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                />
            </Button>
        </Stack>
    )
}

export default ProfilePage
