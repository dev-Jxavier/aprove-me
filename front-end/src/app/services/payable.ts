import api from "@/lib/api";
import { v4 as uuidv4 } from 'uuid';

export interface PayableProps {
    id?: string
    value: number
    emissionDate: Date
    assignorId: string
}

export const createPayable = ({ value, emissionDate, assignorId }: PayableProps) => {
    const uuid = uuidv4()
    return api.post<PayableProps>('/integrations/payable', { id: uuid, value, emissionDate, assignorId })
}

export const getByIdPayable = (id: string) => {
    return api.get<PayableProps>(`/integrations/payable/${id}`)
}