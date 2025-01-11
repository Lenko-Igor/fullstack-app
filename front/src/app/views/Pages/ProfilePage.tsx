import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import UploadIcon from '@mui/icons-material/Upload'
import EditIcon from '@mui/icons-material/Edit'

import { useUserStore } from '../../store/user.store'
import { ProfileProps, Styles, TUser } from '../../global/types'
import { UserAvatar } from '../../components/UserAvatar'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextController } from '../../components/TextController'
import { EmailController } from '../../components/EmailController'
import { FieldNameEnum } from '../../global/enums'
import { MESSAGES } from '../../global/messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaUserProfile } from '../Auth/utiles/schemas'
import { ButtonSubmit } from '../Auth/components/ButtonSubmit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import userService from '../../services/user.service'
import { enqueueSnackbar } from 'notistack'
import { getApiErrorMsg } from '../../utiles/error.utils'
import { dataURLtoFile } from '../../utiles/file.utils'

const FORM_ID: string = 'user_profile'

const ProfilePage = (): JSX.Element => {
    const [file, setFile] = useState<File | null>(null)
    const queryClient = useQueryClient()
    const { currentUser } = useUserStore((state) => state)
    const { control, handleSubmit } = useForm({
        values: {
            [FieldNameEnum.first_name]: currentUser.firstName,
            [FieldNameEnum.last_name]: currentUser.lastName,
            [FieldNameEnum.email]: currentUser.email,
            // [FieldNameEnum.image]: currentUser.profile?.image,
            // phone: currentUser.phone,
            // address: currentUser.address,
            // city: currentUser.city,
            // state: currentUser.state,
            // zipCode: currentUser.zipCode,
        },
        resolver: yupResolver(schemaUserProfile),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: FormData): Promise<TUser> => {
            return userService.updateUser(currentUser.id, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user'],
            })
            enqueueSnackbar(MESSAGES.SUCCESS.UPDATED, { variant: 'success' })
        },
        onError: (e) => {
            enqueueSnackbar(getApiErrorMsg(e), { variant: 'error' })
        },
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.files && setFile(event.target.files[0])
    }

    const clearForm = () => setFile(null)

    const handleUpload = () => {
        console.log({ file })
    }

    const onSubmit: SubmitHandler<ProfileProps> = (data) => {
        const formData = new FormData()

        file && formData.append('image', file as File)

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key as keyof ProfileProps])
        })

        mutate(formData)
    }

    useEffect(() => {
        const { image } = currentUser.profile || {}

        if (image) {
            const file = dataURLtoFile(image, 'avatar.png')
            setFile(file as File)
        }
    }, [currentUser])

    return (
        <Stack
            component={'form'}
            id={FORM_ID}
            onSubmit={handleSubmit(onSubmit)}
            gap={'20px'}
        >
            <Typography variant="h1">ProfilePage</Typography>
            <TextController
                control={control}
                name={FieldNameEnum.first_name}
                label={MESSAGES.LABELS.FIRST_NAME}
                placeholder={MESSAGES.PLACEHOLDERS.FIRST_NAME}
            />
            <TextController
                control={control}
                name={FieldNameEnum.last_name}
                label={MESSAGES.LABELS.LAST_NAME}
                placeholder={MESSAGES.PLACEHOLDERS.LAST_NAME}
            />
            <EmailController
                control={control}
                name={FieldNameEnum.email}
                label={MESSAGES.LABELS.EMAIL}
                placeholder={MESSAGES.PLACEHOLDERS.EMAIL}
            />
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

                <ButtonSubmit
                    form={FORM_ID}
                    isPending={isPending}
                    label={'Save'}
                />
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
