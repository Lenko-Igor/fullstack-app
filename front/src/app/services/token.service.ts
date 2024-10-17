import Cookies from 'js-cookie'
import { TokenData } from '../global/types'

const setToken = ({ token }: TokenData) => {
    Cookies.set('token', token, { expires: 1 })
}

const getAccessToken = () => {
    return Cookies.get('token')
}

const deleteToken = () => {
    Cookies.remove('token')
}

export default {
    setToken,
    getAccessToken,
    deleteToken,
}