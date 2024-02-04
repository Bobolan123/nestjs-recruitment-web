import { Company } from "src/company/entities/company.entity"
import { Level } from "src/level/entities/level.entity"

export class CreateJobDto {
    name:string

    description:string

    skills:[]

    count:number

    status:string

    salary:number

    company:Company

    level:Level
}
