import { Company } from "src/company/entities/company.entity"
import { Skill } from "src/skills/entities/skill.entity"

export class CreateJobDto {
    name:string

    description:string

    skills:Skill[]

    count:number

    status:string

    salary:number

    company:Company

    level:string
}
