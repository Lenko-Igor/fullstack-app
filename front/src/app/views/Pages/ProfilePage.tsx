import React, { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useUserStore } from '../../store/user.store'

const ProfilePage = () => {
    const [file, setFile] = useState<File | null>(null)
    const { currentUser } = useUserStore((state) => state)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.files && setFile(event.target.files[0])
    }

    const clearForm = () => setFile(null)

    const handleUpload = () => {
        console.log({ file })
    }

    return (
        <Stack>
            <Typography variant="h1">ProfilePage</Typography>
            <Typography variant="h2">User: {currentUser.name}</Typography>
            <Typography variant="h3">Email: {currentUser.email}</Typography>
            <Stack width={200}>
                {file ? (
                    <>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="avatar"
                            width={200}
                        />
                        <DeleteForeverIcon onClick={clearForm} />
                        <Button variant="contained" onClick={handleUpload}>
                            Upload
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" component="label" fullWidth>
                        Select avatar
                        <input
                            type="file"
                            hidden
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>
                )}
            </Stack>
        </Stack>
    )
}

export default ProfilePage
