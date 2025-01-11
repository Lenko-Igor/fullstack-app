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
    }, [isSuccess, user])

    return (
        <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
            {isPending ? (
                <CircularProgress size={24.5} color={'white'} />
            ) : (
                <>
                    <UserAvatar
                        name={user?.lastName || ''}
                        src={user?.profile?.image || ''}
                        size={'small'}
                    />
                    <Typography variant="h3">
                        {`${user?.lastName || ''} ${user?.firstName[0] || ''}`}
                    </Typography>
                </>
            )}
        </Stack>
    )
}

export default CurrentUser
