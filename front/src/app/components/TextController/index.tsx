import { Control, Controller, FieldPath } from "react-hook-form";
import { TextField } from "@mui/material";

type InputProps<T extends object> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export const TextController = <T extends object>({
  control,
  name,
  label,
  placeholder = "",
  required = false,
}: InputProps<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          id={name}
          type="text"
          fullWidth
          variant="outlined"
          size="small"
          label={label}
          placeholder={placeholder}
          required={required}
          error={!!error}
          helperText={error && error.message}
          {...field}
        />
      )}
    />
  );
};
