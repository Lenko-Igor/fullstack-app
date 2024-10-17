import { MouseEvent, useState } from 'react'
import { Control, Controller, FieldPath } from 'react-hook-form'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type InputProps<T extends object> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  required?: boolean
}

export const PasswordController = <T extends object>({
  control,
  name,
  label,
  placeholder,
  required = false,
}: InputProps<T>): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          id={name}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          size="small"
          label={label}
          placeholder={placeholder || ''}
          required={required}
          error={!!error}
          helperText={error && error.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...field}
        />
      )}
    />
  )
}
