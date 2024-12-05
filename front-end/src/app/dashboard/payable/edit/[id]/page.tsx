'use client'
import { editPayable, getByIdPayable } from "@/app/services/payable"
import { useParams, useRouter } from "next/navigation"
import Input from "@/app/components/Input"
import Select from "@/app/components/SelectAssignor"
import Button from "@/components/Button";
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface Inputs {
    value: number
    emissionDate: string
    assignorId: string
}

const EditPayable = () => {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const { register, handleSubmit, setError, formState: { errors }, setValue, watch, clearErrors } = useForm<Inputs>();
    const [loading, setLoading] = useState(true)

    const fetch = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await getByIdPayable(id)
            setValue('value', data.value)
            setValue(
                'emissionDate',
                new Date(new Date(data.emissionDate).getTime() - 3 * 60 * 60 * 1000) //Mudando o horário para -3 (UTC-3)
                    .toISOString()
                    .slice(0, 16)
            )
            setValue('assignorId', data.assignorId)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [id, setValue])

    useEffect(() => {
        fetch()
    }, [fetch])

    const onSubmit = async (data: Inputs) => {
        setLoading(true)
        try {
            await editPayable(id, { ...data, value: Number(data.value), emissionDate: new Date(data.emissionDate) })
            router.push(`/dashboard/payable/list`)
        } catch (error: any) {
            setError('root', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="font-bold my-10 text-2xl">Editar pagável: </h1>

            <form className=" space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
                        disable={loading}
                        label="Valor"
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
                <Button label="Editar" type="submit" disable={loading} />
                {errors.root && <span className="text-red-500">Erro interno! Contate o suporte</span>}
            </form>
        </>
    )
}

export default EditPayable