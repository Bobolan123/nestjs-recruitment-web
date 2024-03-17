import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { User } from '../entities/user.entity';
  
  // Adjust the type of 'date' property here
  export interface Response<T> {
    data: {
      id: number;
      company: string;
      name: string;
      status: string;
      date: Date; // Update type to Date
      cvFile:string
    }[];
  }
  
  @Injectable()
  export class GetCvUserInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data: User) => {
          const newData = data.resumes.map((resume) => {
            return {
              id: resume.id,
              name: resume.job.name,
              company: resume.job.company.name,
              status: resume.status,
              date: resume.created_at,
              cvFile:resume.cvFile
            };
          });
          newData.sort((a, b) => a.id - b.id);

          return { data: newData };
        }),
      );
    }
  }
  