import { create } from 'zustand'

export const store = create(() => ({
    role: null,
    user: null,
    users: null
}))