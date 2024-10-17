import { Stack, Typography } from '@mui/material'

type Props = {
  title: string
  subTitle: string
  Icon: JSX.Element
}

export const Header = ({ title, subTitle, Icon }: Props): JSX.Element => {
  return (
    <Stack mb={'30px'}>
      <Stack
        component={Typography}
        variant="body1"
        justifyContent={'center'}
        direction={'row'}
        alignItems={'center'}
        gap={'5px'}
      >
        {subTitle}
        {Icon}
      </Stack>
      <Typography variant="h1" textAlign={'center'}>
        {title}
      </Typography>
    </Stack>
  )
}
