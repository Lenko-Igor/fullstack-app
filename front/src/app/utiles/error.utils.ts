import { CanceledError, isAxiosError } from 'axios'

export const getApiErrorMsg = (error: unknown): string => {
    if (error instanceof CanceledError) {
        return ''
    } else if (isAxiosError(error)) {
        if (error.response) {
            if (error.response.status === 400) {
                return (
                    error.response.data.title || error.response.data.message || ''
                )
            }

            return error.response.data.message || ''
        } else if (error.request) {
            return ''
        }
    } else if (error instanceof Error) {
        return error.message
    }

    return ''
}
