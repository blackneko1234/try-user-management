import { store } from "../store/store"
import apiClient from "./AxiosClient"
import { getRole } from "./User"

export const loginAuth = async (values) => {
    try {
        await apiClient.post("/login", values).then((res) => {
            localStorage.setItem("id", res.data._id)
            getRole(res.data._id).then(() => {
                if (store.getState().role === "user") {
                    window.location.href = "/user"
                } else if (store.getState().role === "admin") {
                    window.location.href = "/console"
                }
            })
        })
    } catch (error) {
        alert("Wrong Username or Password")
    }
}

export const registerAuth = async (values) => {
    try {
        await apiClient.post("/register", values).then(() => {
            window.location.href = 'http://localhost:3000/login';
        })
    } catch (error) {
        alert("The username is already taken")
    }
}

export const logout = () => {
    try {
        localStorage.removeItem("id")
        window.location.href = "/login"
    } catch (error) {

    }
}