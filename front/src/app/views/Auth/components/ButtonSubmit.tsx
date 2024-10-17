import { Button, CircularProgress } from '@mui/material'

type Props = {
  form: string
  isPending: boolean
  label: string
}

export const ButtonSubmit = ({
  form,
  isPending,
  label,
}: Props): JSX.Element => {
  return (
    <Button
      form={form}
      type="submit"
      variant="contained"
      fullWidth
      disabled={isPending}
    >
      {isPending ? <CircularProgress size={24.5} color={'white'} /> : label}
    </Button>
  )
}
