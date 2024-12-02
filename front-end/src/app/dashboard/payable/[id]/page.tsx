'use client'
import { getByIdPayable, PayableProps } from "@/app/services/payable"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const DetailsPayable = () => {
    const { id } = useParams<{ id: string }>()
    const [payable, setPayable] = useState<PayableProps>()
    const [loading, setLoading] = useState(false) // add loading

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await getByIdPayable(id)
                setPayable(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [id])

    return (
        <div className="flex flex-col justify-center items-center mt-20 space-y-10">
            <div className="shadow-lg rounded-lg w-max p-4">
                <h1 className="text-center text-xl mb-4">Pagável</h1>

                <p>Valor: <strong>{payable?.value}</strong></p>
                <p>Data: <strong>{new Date(payable?.emissionDate!).toLocaleDateString()}</strong></p>
                <p>Id do cedente: <strong>{payable?.assignorId}</strong></p>

            </div>
            <Link href={'/dashboard/payable/create'} className="bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 rounded-md">Criar um novo</Link>
        </div>
    )

}

export default DetailsPayable