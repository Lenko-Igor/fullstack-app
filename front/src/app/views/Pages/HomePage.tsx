import { useEffect } from 'react'
import { Button } from '@mui/material'
import { MESSAGES } from '../../global/messages'
import tokenService from '../../services/token.service'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utiles/constants/routes'

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  const handleLogout = () => {
    tokenService.deleteToken()
    navigate(ROUTES.LOGIN)
  }

  useEffect(() => {
    const token = tokenService.getAccessToken()
    console.log({ token })
  }, [])

  return (
    <div>
      <Button onClick={handleLogout} variant="contained" color="warning">
        {MESSAGES.BTN.LOG_OUT}
      </Button>
    </div>
  )
}
