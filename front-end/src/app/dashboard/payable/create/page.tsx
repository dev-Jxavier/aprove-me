"use client"
import Input from "@/app/components/Input"
import Select from "@/app/components/SelectAssignor"
import { createPayable } from "@/app/services/payable";
import Button from "@/components/Button";
import { useForm } from "react-hook-form"

interface Inputs {
    value: number
    emissionDate: Date
    assignorId: string
}

const CreatePayable = () => {
    const { register, handleSubmit, setError, formState: { errors }, setValue, watch, clearErrors } = useForm<Inputs>();

    const onSubmit = async (data: Inputs) => {
        console.log(data)
        try {
            await createPayable({ ...data, value: Number(data.value), emissionDate: new Date(data.emissionDate) })
        } catch (error: any) {
            console.log(error)
            setError('root', error)
        }
    }

    return (
        <>
            <h1 className="font-bold my-10 text-2xl">Criar pagável novo: </h1>

            <form className=" space-y-2 p-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input
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
                        label="cedente"
                        setSelected={(value) => {
                            clearErrors('assignorId')
                            setValue('assignorId', value)
                        }}
                        selected={watch().assignorId}
                        {...register("assignorId", {
                            required: "O cedente é obrigatório",
                        })}
                        error={errors.assignorId?.message}
                    />
                </div>
                <Button label="Cadastar" type="submit" />
                {errors.root && <span className="text-red-500">Erro interno! Contate o suporte</span>}
            </form>
        </>

    )
}

export default CreatePayable