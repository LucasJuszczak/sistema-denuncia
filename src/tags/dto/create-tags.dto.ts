import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTagsDto{
    @IsString({message:"The name field must be text!"})
    @IsNotEmpty({message:"The name field can't be empty!"})
    @MaxLength(60, {message:"The name field must have a maximum of 60 characters!"})
    readonly name: string

    @IsString({message:"The description field must be text!"})
    @IsNotEmpty({message:"The description field can't be empty!"})
    @MaxLength(300, {message:"The description field must be a maximum of 300 characters!"})
    readonly description: string
}