import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import UploadIcon from '@mui/icons-material/Upload'
import EditIcon from '@mui/icons-material/Edit'

import { useUserStore } from '../../store/user.store'
import { Styles } from '../../global/types'
import { UserAvatar } from '../../components/UserAvatar'

const ProfilePage = (): JSX.Element => {
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
            <Typography variant="h2">
                {`User: ${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography variant="h3">Email: {currentUser.email}</Typography>
            <Stack width={100} alignItems={'center'}>
                <UserAvatar
                    src={file ? URL.createObjectURL(file) : ''}
                    name={currentUser.lastName}
                    component="label"
                    size="large"
                    sx={file ? {} : styles.action_icon}
                >
                    <input
                        type="file"
                        hidden
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </UserAvatar>
                {file && (
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={'10px'}
                    >
                        <UploadIcon
                            onClick={handleUpload}
                            sx={styles.action_icon}
                        />
                        <DeleteForeverIcon
                            onClick={clearForm}
                            sx={styles.action_icon}
                        />
                        <Stack component="label" sx={styles.action_icon}>
                            <EditIcon />
                            <input
                                type="file"
                                hidden
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Stack>
    )
}

export default ProfilePage

const styles: Styles = {
    action_icon: {
        cursor: 'pointer',
    },
}
