import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Stack, Button, TextField, Typography } from '@mui/material'
import { MESSAGES } from '../../global/messages'
import { SignUpProps } from '../../global/types'
import authService from '../../services/auth.service'
import tokenService from '../../services/token.service'

export const SignUp = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<SignUpProps>()

  const { mutate } = useMutation({
    mutationFn: (data: SignUpProps): Promise<{ token: string }> => {
      return authService.signup(data)
    },
    onSuccess: ({ token }) => {
      tokenService.setToken({ token })
      navigate('/')
    },
  })
  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
    mutate(data)
  }

  return (
    <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'}>
      <Stack gap={'15px'}>
        <Typography variant="h1" margin={0}>
          {MESSAGES.TITLE.SIGN_UP}
        </Typography>

        <Stack
          component={'form'}
          id="login"
          onSubmit={handleSubmit(onSubmit)}
          gap={1}
        >
          <Controller
            control={control}
            name={'name'}
            defaultValue=""
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Name"
                {...field}
              />
            )}
          />
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
          {MESSAGES.BTN.SIGN_UP}
        </Button>
      </Stack>
    </Stack>
  )
}
