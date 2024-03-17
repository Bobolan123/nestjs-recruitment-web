import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateApiDto {
    @IsNotEmpty()
    endpoint:string

    description:string

    module: string;

    @IsString()
    @IsEnum(['get', 'post', 'patch', 'delete'])
    method: string;
}
