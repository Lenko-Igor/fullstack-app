import { AppBar, Container, Toolbar } from '@mui/material'

import { Logo } from './Logo'
import { Navigation } from './Navigation'
import ProfileSettings from './ProfileSettings'
import ShortNavigation from './ShortNavigation'
import { PAGES } from './constants'

export const Header = (): JSX.Element => {
    return (
        <AppBar position="static">
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <ShortNavigation pages={PAGES} />
                    <Logo />
                    <Navigation pages={PAGES} />
                    <ProfileSettings />
                </Toolbar>
            </Container>
        </AppBar>
    )
}
