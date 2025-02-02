import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import WavingHandIcon from '@mui/icons-material/WavingHand'
import { enqueueSnackbar } from 'notistack'

import { MESSAGES } from '../../global/messages'
import { SignUpProps } from '../../global/types'
import authService, { LoginResponse } from '../../services/auth.service'
import tokenService from '../../services/token.service'
import { EmailController } from '../../components/EmailController'
import { PasswordController } from '../../components/PasswordController'
import { FieldNameEnum } from '../../global/enums'
import { TextController } from '../../components/TextController'
import { schemaSignup } from './utiles/schemas'
import { ROUTES } from '../../utiles/constants/routes'
import { ButtonSubmit } from './components/ButtonSubmit'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { defaultValueSignUp } from './utiles/constants'
import { getApiErrorMsg } from '../../utiles/error.utils'

const FORM_ID: string = 'signup'

export const SignUp = () => {
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm<SignUpProps>({
        defaultValues: defaultValueSignUp,
        resolver: yupResolver(schemaSignup),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: SignUpProps): Promise<LoginResponse> => {
            return authService.signup(data)
        },
        onSuccess: ({ token, refreshToken }) => {
            tokenService.setTokens({ token, refreshToken })
            navigate(ROUTES.INITIAL_ROUTE)
        },
        onError: (e) => {
            enqueueSnackbar(getApiErrorMsg(e), { variant: 'error' })
        },
    })

    const onSubmit: SubmitHandler<SignUpProps> = (data) => {
        mutate(data)
    }

    return (
        <>
            <Header
                title={MESSAGES.TITLE.REGISTRATION}
                subTitle={MESSAGES.LABELS.WELCOME_REGISTRATION}
                Icon={<WavingHandIcon fontSize="small" color="warning" />}
            />

            <Stack
                component={'form'}
                id={FORM_ID}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextController
                    control={control}
                    name={FieldNameEnum.first_name}
                    label={MESSAGES.LABELS.FIRST_NAME}
                    placeholder={MESSAGES.PLACEHOLDERS.FIRST_NAME}
                />
                <TextController
                    control={control}
                    name={FieldNameEnum.last_name}
                    label={MESSAGES.LABELS.LAST_NAME}
                    placeholder={MESSAGES.PLACEHOLDERS.LAST_NAME}
                />
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
                <PasswordController
                    control={control}
                    name={FieldNameEnum.password_confirm}
                    label={MESSAGES.LABELS.CONFIRM_PASSWORD}
                />
                <ButtonSubmit
                    form={FORM_ID}
                    isPending={isPending}
                    label={MESSAGES.BTN.SIGN_UP}
                />
            </Stack>

            <Footer
                href={ROUTES.LOGIN}
                text={MESSAGES.BTN.LOG_IN}
                position={'start'}
            />
        </>
    )
}
