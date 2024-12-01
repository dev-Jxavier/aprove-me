import api from "@/lib/api";

export const login = async ({ login, password }: { login: string, password: string }) => {
    return api.post<{ access_token: string }>('/integrations/auth', { login, password })
}