import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Stack, Button, TextField, Typography } from '@mui/material'
import { MESSAGES } from '../../global/messages'
import authService from '../../services/auth.service'
import tokenService from '../../services/token.service'
import { ROUTES } from '../../utiles/constants/routes'
import { LoginProps } from '../../global/types'

export const Login = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<LoginProps>()
  const { mutate } = useMutation({
    mutationFn: (data: LoginProps): Promise<{ token: string }> => {
      return authService.login(data)
    },
    onSuccess: ({ token }) => {
      tokenService.setToken({ token })
      navigate('/')
    },
  })

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    mutate(data)
  }

  return (
    <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'}>
      <Stack gap={'15px'}>
        <Typography variant="h1" margin={0}>
          {MESSAGES.TITLE.LOG_IN}
        </Typography>

        <Stack
          component={'form'}
          id="login"
          onSubmit={handleSubmit(onSubmit)}
          gap={1}
        >
          <Controller
            control={control}
            name={'email'}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Email"
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name={'password'}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Password"
                {...field}
              />
            )}
          />
        </Stack>

        <Button form="login" type="submit" variant="outlined" fullWidth>
          {MESSAGES.BTN.LOG_IN}
        </Button>
      </Stack>
      <Link to={ROUTES.SIGN_UP}>{MESSAGES.BTN.SIGN_UP}</Link>
    </Stack>
  )
}
