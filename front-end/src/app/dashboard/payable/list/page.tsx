'use client'
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
import { deletePayable, getAllPayable, PayableProps } from "@/app/services/payable"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const ListPayable = () => {
    const [payables, setPayables] = useState<PayableProps[]>([])
    const router = useRouter()

    const fetchAllPayables = async () => {
        try {
            const response = await getAllPayable()
            setPayables(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllPayables()
    }, [])

    const onDelete = async (id: string) => {
        await deletePayable(id)
        fetchAllPayables()
    }

    const onEdit = (id: string) => {
        router.push(`/dashboard/payable/create/${id}`)
    }

    return (
        <>
            <h1 className="font-bold my-10 text-2xl">Criar pagável novo: </h1>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Valor</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Data de emissão </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payables.map((payable) => (
                            <tr key={payable.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{payable.id}</td>
                                <td className="border border-gray-300 px-4 py-2">R$ {(payable.value / 10).toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(payable.emissionDate).toLocaleString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-semibold mr-2"
                                        onClick={() => onEdit(payable.id!)}
                                    >
                                        <PencilSquareIcon className="size-6 shrink-0 text-indigo-500" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                        onClick={() => onDelete(payable.id!)}
                                    >
                                        <TrashIcon className="size-6 shrink-0 text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListPayable