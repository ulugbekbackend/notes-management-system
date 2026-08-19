import { createContext, useState } from "react";
import { login } from "../services/authService";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(
        localStorage.getItem("username") || null
    );



    const loginUser = async (username, password) => {


        const data = await login(
            username,
            password
        );


        localStorage.setItem(
            "access",
            data.access
        );


        localStorage.setItem(
            "refresh",
            data.refresh
        );


        localStorage.setItem(
            "username",
            username
        );


        setUser(username);


    };



    const logoutUser = () => {


        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        localStorage.removeItem("username");


        setUser(null);


    };



    return (

        <AuthContext.Provider

            value={{
                user,
                loginUser,
                logoutUser
            }}

        >

            {children}

        </AuthContext.Provider>

    );


};