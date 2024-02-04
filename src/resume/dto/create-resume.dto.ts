import { User } from "src/user/entities/user.entity"

export class CreateResumeDto {
    status:'rejected' | 'reviewing' | 'pending' | 'approved'

    user:User
    
}
