import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import { Login } from './views/Auth/Login'
import { PageNotFound } from './views/ErrorPages/PageNotFound'
import { HomePage } from './views/Pages/HomePage'
import { PageNotAuthorized } from './views/ErrorPages/PageNotAuthorized'
import { ROUTES } from './utiles/constants/routes'
import { Layout } from './views/Layouts/Layout'
import { RequireAuth } from './HOK/RequireAuth'
import { SignUp } from './views/Auth/SignUp'
import { AuthLayout } from './views/Layouts/AuthLayout'
import { ProductsPage } from './views/Pages/ProductsPage'
import { PricingPage } from './views/Pages/PricingPage'
import { BlogPage } from './views/Pages/BlogPage'
import ProfilePage from './views/Pages/ProfilePage'

const router = createBrowserRouter([
    {
        path: ROUTES.INITIAL_ROUTE,
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        errorElement: <PageNotAuthorized />,
        children: [
            {
                path: ROUTES.HOME,
                element: <HomePage />,
                errorElement: <PageNotFound />,
            },
            {
                path: ROUTES.PRODUCTS,
                element: <ProductsPage />,
                errorElement: <PageNotFound />,
            },
            {
                path: ROUTES.PRICING,
                element: <PricingPage />,
                errorElement: <PageNotFound />,
            },
            {
                path: ROUTES.BLOG,
                element: <BlogPage />,
                errorElement: <PageNotFound />,
            },
            {
                path: ROUTES.PROFILE,
                element: <ProfilePage />,
                errorElement: <PageNotFound />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <Login />,
                errorElement: <PageNotFound />,
            },
            {
                path: ROUTES.SIGN_UP,
                element: <SignUp />,
                errorElement: <PageNotFound />,
            },
        ],
    },
])
export const Router = () => {
    return <RouterProvider router={router} />
}
