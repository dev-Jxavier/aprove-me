"use client"
import Image from "next/image";
import Input from "./Components/Input";
import Button from "./Components/Button";
import { useForm } from "react-hook-form";

interface Inputs {
  user: string
  password: string
}

export default function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src='/logo-bankme.png' width={80} height={80} alt="logo-bankme" className="mx-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Entre com sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Usuário" type="text" placeholder="usuário" {...register("user")} />
            <Input label="Senha" type="password" placeholder="senha" {...register("password")} />

            <Button label="Entrar" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
