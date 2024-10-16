import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Button, Typography, CircularProgress } from "@mui/material";

import { MESSAGES } from "../../global/messages";
import { SignUpProps } from "../../global/types";
import authService from "../../services/auth.service";
import tokenService from "../../services/token.service";
import { EmailController } from "../../components/EmailController";
import { PasswordController } from "../../components/PasswordController";
import { FieldNameEnum } from "../../global/enums";
import { TextController } from "../../components/TextController";
import { schemaSignup } from "../../utiles/schemas";
import { ROUTES } from "../../utiles/constants/routes";

export const SignUp = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignUpProps>({
    defaultValues: {
      [FieldNameEnum.name]: "",
      [FieldNameEnum.email]: "",
      [FieldNameEnum.password]: "",
      [FieldNameEnum.password_confirm]: "",
    },
    resolver: yupResolver(schemaSignup),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpProps): Promise<{ token: string }> => {
      return authService.signup(data);
    },
    onSuccess: ({ token }) => {
      tokenService.setToken({ token });
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
    mutate(data);
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Stack gap={"15px"}>
        <Typography variant="h1" margin={0}>
          {MESSAGES.TITLE.SIGN_UP}
        </Typography>

        <Stack component={"form"} id="login" onSubmit={handleSubmit(onSubmit)}>
          <TextController
            control={control}
            name={FieldNameEnum.name}
            label={MESSAGES.LABELS.USER_NAME}
            placeholder={MESSAGES.PLACEHOLDERS.YOUR_NAME}
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
            placeholder={MESSAGES.PLACEHOLDERS.PASSWORD}
          />
          <PasswordController
            control={control}
            name={FieldNameEnum.password_confirm}
            label={MESSAGES.LABELS.PASSWORD}
            placeholder={MESSAGES.PLACEHOLDERS.PASSWORD}
          />
        </Stack>

        <Button
          form="login"
          type="submit"
          variant="outlined"
          fullWidth
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24.5} /> : MESSAGES.BTN.LOG_IN}
        </Button>
      </Stack>
      <Link to={ROUTES.LOGIN}>{MESSAGES.BTN.LOG_IN}</Link>
    </Stack>
  );
};