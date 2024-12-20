'use client'
import { AssignorProps, getByIdAssignor } from "@/app/services/assignor"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const DetailsAssignor = () => {
    const { id } = useParams<{ id: string }>()
    const [assignor, setAssignor] = useState<AssignorProps>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const response = await getByIdAssignor(id)
                setAssignor(response.data)
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
                <h1 className="text-center text-xl mb-4">{loading ? 'Carregando...' : 'Cedente'}</h1>

                {!loading && !assignor && <p className="font-bold">Nenhum cedente encontrado!</p>}
                {!loading && assignor && (
                    <>
                        <p>Nome: <strong>{assignor?.name}</strong></p>
                        <p>Email: <strong>{assignor?.email}</strong></p>
                        <p>Documento: <strong>{assignor?.document}</strong></p>
                        <p>Telefone: <strong>{assignor?.phone}</strong></p>
                    </>
                )}

            </div>
        </div>
    )

}

export default DetailsAssignor