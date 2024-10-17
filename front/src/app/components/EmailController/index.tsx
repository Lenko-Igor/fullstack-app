import { Control, Controller, FieldPath } from "react-hook-form";
import { TextField } from "@mui/material";

import { MESSAGES } from "../../global/messages";

type InputProps<T extends object> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export const EmailController = <T extends object>({
  control,
  name,
  label,
  placeholder,
  required = false,
}: InputProps<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          id={name}
          fullWidth
          variant="outlined"
          size="small"
          label={label}
          placeholder={placeholder || MESSAGES.PLACEHOLDERS.EMAIL}
          required={required}
          error={!!error}
          helperText={error && error.message}
          {...field}
        />
      )}
    />
  );
};
