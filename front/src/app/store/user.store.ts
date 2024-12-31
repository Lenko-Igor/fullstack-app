import { create } from 'zustand'

import { TUser } from '../global/types'

const INITIAL_STATE: UserData = {
    currentUser: {
        id: '',
        name: '',
        email: '',
    }
}

export const useUserStore = create<UserStore>((set) => ({
    ...INITIAL_STATE,
    setCurrentUser: (user: TUser) => {
        set((state: UserData) => ({ ...state, currentUser: user }))
    },
}))

type UserData = {
    currentUser: TUser
}

type UserStore = UserData & {
    setCurrentUser: (data: TUser) => void
}