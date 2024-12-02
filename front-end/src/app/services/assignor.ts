import api from "@/lib/api";
import { v4 as uuidv4 } from 'uuid';

export interface AssignorProps {
    id?: string
    document: string
    email: string
    phone: string
    name: string
}

export const createAssignor = ({ document, email, name, phone }: AssignorProps) => {
    const uuid = uuidv4()
    return api.post<AssignorProps>('/integrations/assignor', { id: uuid, document, email, name, phone })
}

export const getByIdAssignor = (id: string) => {
    return api.get<AssignorProps>(`/integrations/assignor/${id}`)
}