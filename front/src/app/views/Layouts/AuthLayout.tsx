import { Outlet } from 'react-router-dom'
import { Paper, Stack } from '@mui/material'

import { Styles } from '../../global/types'

const styles: Styles = {
    container: {
        padding: '30px',
        borderRadius: '10px',
        minWidth: '300px',
    },
}

export const AuthLayout = () => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'}>
            <Paper elevation={6} sx={styles.container}>
                <Outlet />
            </Paper>
        </Stack>
    )
}
