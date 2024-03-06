import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Company } from '../entities/company.entity';
  import { Level } from 'src/level/entities/level.entity';
  
  export interface Response<T> {
    data: T;
  }
  
  interface IJob {
    name: string;
    description: string;
    skills: string[];
    count: number;
    status: string;
    salary: number;
    company: Company;
    level: Level;
    created_at: string;
  }
  
  interface IJobWithTimeDifference extends IJob {
    timeDifference: string;
  }
  
  @Injectable()
  export class DifferencesDateInterceptor<T>
    implements NestInterceptor<T, Response<IJobWithTimeDifference[]>> // Adjust return type
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<IJobWithTimeDifference[]>> { // Adjust return type
      return next.handle().pipe(
        map((data: any) => {
          const newData = data.data.map(job => {
            const createdAt = new Date(job.created_at);
            const currentTime = new Date();
            const timeDifference = currentTime.getTime() - createdAt.getTime();
            const formattedDifference = this.formatTimeDifference(timeDifference);
            return { ...job, timeDifference: formattedDifference } as IJobWithTimeDifference; // Cast to IJobWithTimeDifference
          });
          return { data: newData };
        }),
      );
    }
  
    private formatTimeDifference(timeDifference: number): string {
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days >= 1) {
        return `${days} days ago`;
      } else if (hours >= 1) {
        return `${hours} hours ago`;
      } else {
        return `${minutes} minutes ago`;
      }
    }
  }
