import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Stack } from '@mui/material'
import BackHandIcon from '@mui/icons-material/BackHand'

import { MESSAGES } from '../../global/messages'
import authService from '../../services/auth.service'
import tokenService from '../../services/token.service'
import { ROUTES } from '../../utiles/constants/routes'
import { LoginProps } from '../../global/types'
import { EmailController } from '../../components/EmailController'
import { FieldNameEnum } from '../../global/enums'
import { PasswordController } from '../../components/PasswordController'
import { schemaLogin } from './utiles/schemas'
import { ButtonSubmit } from './components/ButtonSubmit'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { defaultValueLogIn } from './utiles/constants'

const FORM_ID: string = 'login'

export const Login = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<LoginProps>({
    defaultValues: defaultValueLogIn,
    resolver: yupResolver(schemaLogin),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginProps): Promise<{ token: string }> => {
      return authService.login(data)
    },
    onSuccess: ({ token }) => {
      tokenService.setToken({ token })
      navigate(ROUTES.INITIAL_ROUTE)
    },
  })

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    mutate(data)
  }

  return (
    <>
      <Header
        title={MESSAGES.TITLE.LOG_IN}
        subTitle={MESSAGES.LABELS.WELCOME_BACK}
        Icon={<BackHandIcon fontSize="small" color="warning" />}
      />

      <Stack
        component={'form'}
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        width={'100%'}
      >
        <EmailController
          control={control}
          name={FieldNameEnum.email}
          label={MESSAGES.LABELS.EMAIL}
          placeholder={MESSAGES.PLACEHOLDERS.EMAIL}
        />
        <PasswordController
          control={control}
          name={FieldNameEnum.password}
          label={MESSAGES.LABELS.PASSWORD}
        />
        <ButtonSubmit
          form={FORM_ID}
          isPending={isPending}
          label={MESSAGES.BTN.LOG_IN}
        />
      </Stack>

      <Footer
        href={ROUTES.SIGN_UP}
        text={MESSAGES.BTN.REGISTRATION}
        position={'end'}
      />
    </>
  )
}
