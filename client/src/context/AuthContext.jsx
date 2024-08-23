import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const updateUser = (data) => {
        setUser(data)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>

}
