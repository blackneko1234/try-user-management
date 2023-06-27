import { Navigate } from "react-router-dom";
import { getRole } from "../services/User"
import { store } from "../store/store";
import { useState } from "react";

export const localStorageID = localStorage.getItem("id")
export const IsNotLoggedin = ({ children }) => {
    const [role, setRole] = useState({})
    if (!localStorageID) {
        return children
    } else {
        getRole(localStorageID).then(() => {
            setRole(store.getState().role)
        })
        if (role === "admin") {
            return <Navigate to="/console" replace />
        } else if (role === "user") {
            return <Navigate to='/user' replace />
        }
    }
}

export const IsLoggedin = ({ isAdmin = false, children }) => {
    const [role, setRole] = useState({})
    if (!localStorageID) {
        return <Navigate to="/login" replace />
    } else {
        getRole(localStorageID).then(() => {
            setRole(store.getState().role)
        })
        if ((isAdmin === true && role === "user") || (isAdmin === false && role === "admin")) {
            return <Navigate to="/notAllow" replace />
        } else {
            return children
        }
    }
}