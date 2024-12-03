"use client"
import Input from "@/app/components/Input"
import { createAssignor } from "@/app/services/assignor";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

interface Inputs {
    document: string
    email: string
    phone: string
    name: string
}

const CreateAssignor = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: Inputs) => {
        setLoading(true)
        try {
            const response = await createAssignor({ ...data })
            router.push(`/dashboard/assignor/${response.data.id}`)
        } catch (error: any) {
            setError('root', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="font-bold my-10 text-2xl">Criar cedente novo: </h1>

            <form className=" space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        disable={loading}
                        label="Documento (CPF ou CNPJ)"
                        placeholder="00.000.000-00"
                        type="text"
                        {...register("document", {
                            required: "O documento é obrigatório",
                            pattern: {
                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                message: "Documento inválido. Insira um CPF ou CNPJ válido",
                            },
                        })}
                        error={errors.document?.message}
                    />
                </div>
                <div>
                    <Input
                        disable={loading}
                        label="Email"
                        placeholder="example@example.com"
                        type="email"
                        {...register("email", {
                            required: "O email é obrigatório",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email inválido",
                            },
                        })}
                        error={errors.email?.message}
                    />
                </div>
                <div>
                    <Input
                        disable={loading}
                        label="Telefone"
                        placeholder="55996359999"
                        type="text"
                        {...register("phone", {
                            required: "O telefone é obrigatório",
                            pattern: {
                                value: /^55\d{9}$/,
                                message: "Telefone inválido. Use o formato 55996359999",
                            },
                        })}
                        error={errors.phone?.message}
                    />

                </div>
                <div>
                    <Input
                        disable={loading}
                        label="Nome"
                        placeholder="Jones"
                        type="text"
                        {...register("name", {
                            required: "O nome é obrigatório",
                            minLength: {
                                value: 2,
                                message: "O nome deve ter pelo menos 2 caracteres",
                            },
                        })}
                        error={errors.name?.message}
                    />
                </div>
                <Button label="Cadastar" type="submit" disable={loading} />
                {errors.root && <span>Erro interno! Contate o suporte</span>}
            </form>
        </>

    )
}

export default CreateAssignor