import { ROUTES } from "../../utiles/constants/routes"

export type PageOption = {
    id: number
    title: string
    href: string
}

export const PAGES: PageOption[] = [
    {
        id: 1,
        title: 'Home',
        href: ROUTES.HOME,
    },
    {
        id: 2,
        title: 'Products',
        href: ROUTES.PRODUCTS,
    },
    {
        id: 3,
        title: 'Pricing',
        href: ROUTES.PRICING,
    },
    {
        id: 4,
        title: 'Blog',
        href: ROUTES.BLOG,
    },
]

export const settings: PageOption[] = [
    {
        id: 1,
        title: 'Profile',
        href: ROUTES.PROFILE,
    },
    {
        id: 2,
        title: 'Logout',
        href: ROUTES.LOGOUT,
    }]