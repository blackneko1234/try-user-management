import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from '../page/authentication/Login';
import Register from '../page/authentication/Register';
import PermissionDenied from '../page/authentication/PermissionDenied';
import Profile from '../page/user/Profile';
import Console from '../page/user/Console';
import EditProfile from "../page/user/EditProfile";
import { IsLoggedin, IsNotLoggedin } from "./routerIndex";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <IsNotLoggedin><Login /></IsNotLoggedin>
        },
        {
            path: "/register",
            element: <IsNotLoggedin><Register /></IsNotLoggedin>
        },
        {
            path: "/",
            element: <IsNotLoggedin><Navigate to='/user' /></IsNotLoggedin>
        },
        {
            path: "/user",
            element: <IsLoggedin><Profile /></IsLoggedin>,
        },
        {
            path: "user/edit",
            element: <IsLoggedin><EditProfile /></IsLoggedin>,
        },
        {
            path: "/console",
            element: <IsLoggedin isAdmin={true}><Console /></IsLoggedin>
        },
        {
            path: "/user/:id",
            element: <IsLoggedin isAdmin={true}><Profile /></IsLoggedin>,
        },
        {
            path: "user/:id/edit",
            element: <IsLoggedin isAdmin={true}><EditProfile /></IsLoggedin>,
        },
        {
            path: "/notAllow",
            element: <PermissionDenied />
        },
        {
            path: "/*",
            element: <p>Page Not Found</p>
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default Router;