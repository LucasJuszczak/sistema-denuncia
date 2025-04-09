import { IsBoolean, IsOptional } from "class-validator"
import { CreateComplaintsDto } from "./create-complaints.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateComplaintsDto extends PartialType(CreateComplaintsDto){

    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean
}