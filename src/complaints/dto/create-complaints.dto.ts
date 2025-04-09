/*
DTO (Data Transfer Object) - Objeto de Transferência de Dados
Objetivo: Validar dados, transformar.
É utilizado para representar quais dados e em que formatos 
uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateComplaintsDto{
    @IsString({message:"The title field must be text!"})
    @IsNotEmpty({message:"The title field can't be empty!"})
    @MaxLength(60, {message:"The title field must have a maximum of 60 characters!"})
    readonly title: string

    @IsString({message:"The description field must be text!"})
    @IsNotEmpty({message:"The description field can't be empty!"})
    @MaxLength(300, {message:"The description field must be a maximum of 300 characters!"})
    readonly description: string

    @IsString({message:"The location field must be text!"})
    @IsNotEmpty({message:"The location field can't be empty!"})
    @MaxLength(80, {message:"The location field must be a maximum of 80 characters!"})
    readonly location: string
}