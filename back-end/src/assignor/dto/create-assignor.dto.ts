import { IsUUID, IsString, Length, Matches, IsEmail } from "class-validator";

export class CreateAssignorDto {
    @IsUUID('all', { message: 'O campo id deve ser um UUID válido.' })
    id: string;

    @IsString({ message: 'O campo document deve ser uma string.' })
    @Length(11, 14, { message: 'O campo document deve ter entre 11 e 14 caracteres (CPF ou CNPJ).' }) 
    @Matches(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/, {message: "O campo document deve ser um CNPJ ou CPF."}) //Valuda CPF ou CNPJ
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