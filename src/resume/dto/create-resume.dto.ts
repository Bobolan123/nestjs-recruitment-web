import { Job } from "src/job/entities/job.entity";
import { User } from "src/user/entities/user.entity"

export class CreateResumeDto {
    status:'rejected' | 'reviewing' | 'pending' | 'approved'

    user:User
    
    job: Job;

    cvFile: Express.Multer.File;

}
