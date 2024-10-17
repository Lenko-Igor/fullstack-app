import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export type Position = 'start' | 'end'

type Props = {
  href: string
  text: string
  position: Position
}

export const Footer = ({ href, text, position }: Props) => {
  return (
    <Stack alignItems={`flex-${position}`} width={'100%'} pt={'15px'}>
      <Stack
        component={Link}
        to={href}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'5px'}
      >
        {position === 'start' && <KeyboardArrowLeftIcon fontSize="small" />}
        <Typography variant="body2">{text}</Typography>
        {position === 'end' && <KeyboardArrowRightIcon fontSize="small" />}
      </Stack>
    </Stack>
  )
}
