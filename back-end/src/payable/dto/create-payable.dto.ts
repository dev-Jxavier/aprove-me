import { IsUUID, IsNumber, IsDateString } from "class-validator";

export class CreatePayableDto {
    @IsUUID('all', { message: 'O campo id deve ser um UUID válido.' })
    id: string;

    @IsNumber({}, { message: 'O campo value deve ser um número.' })
    value: number;

    @IsDateString({}, { message: 'O campo emissionDate deve ser uma data válida.' })
    emissionDate: Date;

    @IsUUID('all', { message: 'O campo assignor deve ser um UUID válido.' })
    assignor: string;
}