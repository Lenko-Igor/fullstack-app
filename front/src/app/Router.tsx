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
