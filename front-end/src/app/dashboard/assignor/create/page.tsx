"use client"
import Input from "@/app/components/Input"
import { createAssignor } from "@/app/services/assignor";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"

interface Inputs {
    document: string
    email: string
    phone: string
    name: string
}

const CreateAssignor = () => {
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm<Inputs>();
    const router = useRouter()

    const onSubmit = async (data: Inputs) => {
        console.log(data)
        try {
            const response = await createAssignor({ ...data })
            router.push(`/dashboard/assignor/${response.data.id}`)
        } catch (error: any) {
            setError('root', error)
        }
    }

    return (
        <form className=" space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input
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
            <Button label="Cadastar" type="submit" />
            {errors.root && <span>Erro interno! Contate o suporte</span>}
        </form>

    )
}

export default CreateAssignor