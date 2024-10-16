import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Stack, Button, Typography, CircularProgress } from "@mui/material";

import { MESSAGES } from "../../global/messages";
import authService from "../../services/auth.service";
import tokenService from "../../services/token.service";
import { ROUTES } from "../../utiles/constants/routes";
import { LoginProps } from "../../global/types";
import { EmailController } from "../../components/EmailController";
import { FieldNameEnum } from "../../global/enums";
import { PasswordController } from "../../components/PasswordController";
import { schemaLogin } from "../../utiles/schemas";

export const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginProps>({
    defaultValues: {
      [FieldNameEnum.email]: "",
      [FieldNameEnum.password]: "",
    },
    resolver: yupResolver(schemaLogin),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginProps): Promise<{ token: string }> => {
      return authService.login(data);
    },
    onSuccess: ({ token }) => {
      tokenService.setToken({ token });
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    mutate(data);
  };

  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Stack gap={"15px"}>
        <Typography variant="h1" margin={0}>
          {MESSAGES.TITLE.LOG_IN}
        </Typography>

        <Stack component={"form"} id="login" onSubmit={handleSubmit(onSubmit)}>
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
        </Stack>

        <Button
          form="login"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={24.5} color={"white"} />
          ) : (
            MESSAGES.BTN.LOG_IN
          )}
        </Button>
      </Stack>
      <Link to={ROUTES.SIGN_UP}>{MESSAGES.BTN.SIGN_UP}</Link>
    </Stack>
  );
};
