"use client"
import Input from "@/app/components/Input"
import Select from "@/app/components/SelectAssignor"
import { createPayable } from "@/app/services/payable";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

interface Inputs {
    value: number
    emissionDate: Date
    assignorId: string
}

const CreatePayable = () => {
    const { register, handleSubmit, setError, formState: { errors }, setValue, watch, clearErrors } = useForm<Inputs>();
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data: Inputs) => {
        setLoading(true)
        try {
            const response = await createPayable({ ...data, value: Number(data.value), emissionDate: new Date(data.emissionDate) })
            router.push(`/dashboard/payable/${response.data.id}`)
        } catch (error: any) {
            setError('root', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="font-bold my-10 text-2xl">Criar pagável novo: </h1>

            <form className=" space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        disable={loading}
                        label="Valor"
                        placeholder="00.00"
                        type="number"
                        {...register("value", {
                            required: "O valor é obrigatório",
                        })}
                        error={errors.value?.message}
                    />
                </div>
                <div>
                    <Input
                        disable={loading}
                        label="Data de emissão"
                        type="datetime-local"
                        {...register("emissionDate", {
                            required: "A data é obrigatório",
                        })}
                        error={errors.emissionDate?.message}
                    />
                </div>
                <div>
                    <Select
                        disable={loading}
                        label="cedente"
                        setSelected={(value) => {
                            clearErrors('assignorId')
                            setValue('assignorId', value)
                        }}
                        selected={watch().assignorId || ""}
                        {...register("assignorId", {
                            required: "O cedente é obrigatório",
                        })}
                        error={errors.assignorId?.message}
                    />
                </div>
                <Button label="Cadastar" type="submit" disable={loading} />
                {errors.root && <span className="text-red-500">Erro interno! Contate o suporte</span>}
            </form>
        </>

    )
}

export default CreatePayable