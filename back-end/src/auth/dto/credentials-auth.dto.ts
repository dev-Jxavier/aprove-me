import { IsString } from "class-validator"

export class Credentials {
    @IsString({ message: "O campo login deve ser uma string" })
    login: string

    @IsString({ message: "O campo password deve ser uma string" })
    password: string
}
