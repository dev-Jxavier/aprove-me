"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { getLocalStorage } from "../lib/localStorage"
import { TOKEN_BAKNME } from "../lib/constants-local-storage"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

interface AuthContext {
    setToken: (token: string) => void
    token: string
    deleteToken: () => void
}

const AuthContext = createContext<AuthContext | null>(null)

const HeaderNoSSR = dynamic(() => import('../components/Header'), { ssr: false })

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
            <HeaderNoSSR />
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
