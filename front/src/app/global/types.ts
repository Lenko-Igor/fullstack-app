import { CSSProperties } from "react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export type TokensData = {
  token: string;
  refreshToken: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export type StyleProps =
  | SystemStyleObject<Theme>
  | ((theme: Theme) => SystemStyleObject<Theme>)
  | CSSProperties;

export type Styles = {
  [key: string]: StyleProps;
};
