import { useEffect } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import userService from '../../services/user.service'
import { UserAvatar } from '../../components/UserAvatar'
import { useUserStore } from './../../store/user.store'

const CurrentUser = (): JSX.Element => {
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    const {
        data: user,
        isPending,
        isSuccess,
    } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getCurrentUser,
    })

    useEffect(() => {
        if (isSuccess && user) {
            setCurrentUser(user)
        }
    }, [isSuccess])

    return (
        <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
            {isPending ? (
                <CircularProgress size={24.5} color={'white'} />
            ) : (
                <>
                    <UserAvatar
                        name={user?.name || ''}
                        src={''}
                        size={'small'}
                    />
                    <Typography variant="h3">{user?.name || ''}</Typography>
                </>
            )}
        </Stack>
    )
}

export default CurrentUser
