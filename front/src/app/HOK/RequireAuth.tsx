import tokenService from '../services/token.service'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../utiles/constants/routes'

type Props = {
  children: JSX.Element
}
export const RequireAuth = ({ children }: Props): JSX.Element => {
  const location = useLocation()
  const token = tokenService.getAccessToken()

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (location.pathname === ROUTES.INITIAL_ROUTE) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return children
}
