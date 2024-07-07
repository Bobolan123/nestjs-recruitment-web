import { Company } from "src/company/entities/company.entity"
import { Skill } from "src/skills/entities/skill.entity"

export class CreateJobDto {
    name:string

    location: string 

    description: string

    skills:Skill[]

    count:number

    status:boolean

    salary:number

    company:Company

    level:string

    startDate:Date

    endDate:Date
}
