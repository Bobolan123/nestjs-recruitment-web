import { IsEnum, IsNotEmpty } from "class-validator"

export class CreateRoleDto {
    @IsNotEmpty()
    @IsEnum(['hr', 'user', 'admin'])
    name:'hr' | 'user' | 'admin' 

    description:string

    apiIds: number[]
}
