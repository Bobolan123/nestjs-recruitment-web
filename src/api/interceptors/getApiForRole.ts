import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from '../entities/api.entity';

interface FilteredApi {
  id: number;
  endpoint: string;
  description: string;
  method: string;
}

export interface Response<T> {
  module: string;
  endpoints: FilteredApi[];
}

@Injectable()
export class GetApiForRole<T> implements NestInterceptor<T, Response<T>[]> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>[]> {
    return next.handle().pipe(
      map(data => {
        // Group endpoints by module
        const groupedData = data.reduce((acc: { [module: string]: Api[] }, curr: Api) => {
          if (!acc[curr.module]) {
            acc[curr.module] = [];
          }
          acc[curr.module].push(curr);
          return acc;
        }, {});

        // Convert grouped data to desired format
        const result = Object.keys(groupedData).map(module => ({
          module: module,
          endpoints: groupedData[module].map(({ id, endpoint, description, method }: Api) => ({
            id,
            endpoint,
            description,
            method
          }))
        }));

        return result;
      })
    );
  }
}
