import { IsDate, IsEmail, IsNumber, IsString, IsUUID, Length, Matches } from "class-validator"

export class CreateIntegrationDto {
    payable: Payable
    assignor: Assignor
}

class Payable {
    @IsUUID('all', { message: 'O campo id deve ser um UUID válido.' })
    id: string;

    @IsNumber({}, { message: 'O campo value deve ser um número.' })
    value: number;

    @IsDate({ message: 'O campo emissionDate deve ser uma data válida.' })
    emissionDate: Date;

    @IsUUID('all', { message: 'O campo assignor deve ser um UUID válido.' })
    assignor: string;
}

export class Assignor {
    @IsUUID('all', { message: 'O campo id deve ser um UUID válido.' })
    id: string;

    @IsString({ message: 'O campo document deve ser uma string.' })
    @Length(11, 30, { message: 'O campo document deve ter entre 11 e 30 caracteres (CPF ou CNPJ).' })
    @Matches(/^\d+$/, { message: 'O campo document deve conter apenas números.' }) // Valida apenas números
    document: string;

    @IsEmail({}, { message: 'O campo email deve conter um endereço de email válido.' })
    @Length(1, 140, { message: 'O campo email deve ter no máximo 140 caracteres.' })
    email: string;

    @IsString({ message: 'O campo phone deve ser uma string.' })
    @Length(10, 20, { message: 'O campo phone deve ter entre 10 e 20 caracteres.' })
    @Matches(/^\d+$/, { message: 'O campo document deve conter apenas números.' }) // Valida apenas números
    phone: string;

    @IsString({ message: 'O campo name deve ser uma string.' })
    @Length(1, 140, { message: 'O campo name deve ter no máximo 140 caracteres.' })
    name: string;
}