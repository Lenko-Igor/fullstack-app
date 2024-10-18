import React from 'react'
import { Alert } from '@mui/material'

type Props = {
    message: string
}

export const Snackbar = (severity: 'success' | 'error') =>
    React.forwardRef<HTMLDivElement, Props>((props, ref) => (
        <Alert severity={severity} ref={ref}>
            {props.message}
        </Alert>
    ))
