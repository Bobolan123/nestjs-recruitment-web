import { IsNotEmpty } from "class-validator";

export class CreateApiDto {
    @IsNotEmpty()
    endpoint:string

    description:string
}
