import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Styles } from '../../global/types'
import { Header } from '../Header'

const styles: Styles = {
    main: {
        padding: '10px 0 ',
    },
}

export const Layout = (): JSX.Element => {
    return (
        <>
            <Header />

            <Container sx={styles.main} maxWidth={'xl'}>
                <Outlet />
            </Container>
        </>
    )
}
