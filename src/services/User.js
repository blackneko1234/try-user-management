import { store } from "../store/store"
import apiClient from "./AxiosClient"

export const getProfile = async (id) => {
    try {
        await apiClient.get(`/user/${id}`).then((res) => {
            store.setState({ user: res.data })
        })
    } catch (error) {

    }
}

export const getRole = async (id) => {
    try {
        await apiClient.get(`/userRole/${id}`).then((res) => {
            store.setState({ role: res.data.role })
        })
    } catch (error) {

    }
}

export const deleteUser = (id) => {
    try {
        return apiClient.delete(`/user/${id}`)
    } catch (error) {

    }
}

export const updateUser = (id, data) => {
    try {
        return apiClient.put(`/user/${id}`, data)
    } catch (error) {

    }
}

export const getAllUsers = async () => {
    try {
        return apiClient.get(`/users`).then((res) => {
            store.setState({ users: res.data })
        })
    } catch (error) {

    }
}