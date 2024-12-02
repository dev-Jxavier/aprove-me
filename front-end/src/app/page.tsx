"use client"
import Image from "next/image";
import Input from "./Components/Input";
import Button from "./Components/Button";
import { useForm } from "react-hook-form";
import { login } from "@/services/login";
import { getLocalStorage, setLocalStorage } from "./lib/localStorage";
import { TOKEN_BAKNME } from "./lib/constants-local-storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Inputs {
  login: string
  password: string
}

export default function Home() {
  const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<Inputs>();
  const router = useRouter()

  useEffect(() => {
    if (getLocalStorage(TOKEN_BAKNME)) {
      router.push("/dashboard")
    }
  }, [router])

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await login(data)
      setLocalStorage(TOKEN_BAKNME, response.data.access_token);
      router.push('/dashboard')
    } catch (error: any) {
      setError('root', { message: error?.response?.data.message || "Erro interno!" })
    }
  }

  return (
    <div className="mt-20">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src='/logo-bankme-large.png' width={250} height={250} alt="logo-bankme" className="mx-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Entre com sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Usuário" type="text" placeholder="usuário" {...register("login")} />
            <Input label="Senha" type="password" placeholder="senha" {...register("password")} />
            <Button label="Entrar" type="submit" disable={!!!watch().login && !!!watch().password} />
            {errors.root ? <p className="text-red-600">{errors.root.message}</p> : <p></p>}
          </form>
        </div>
      </div>
    </div>
  );
}
