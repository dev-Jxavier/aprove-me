"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Header from "../components/Header"
import { getLocalStorage } from "../lib/localStorage"
import { TOKEN_BAKNME } from "../lib/constants-local-storage"
import { useRouter } from "next/navigation"

interface AuthContext {
    setToken: (token: string) => void
    token: string
    deleteToken: () => void
}

const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [token, setToken] = useState(getLocalStorage(TOKEN_BAKNME))

    const deleteToken = () => setToken(null)

    useEffect(() => {
        if (!token) router.push('/')
    }, [token])

    return (
        <AuthContext.Provider
            value={{ setToken, token, deleteToken }}
        >
            {token && <Header />}
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === null) {
        throw new Error("Erro ao utilizar contexto de autenticação!")
    }
    return context
}
