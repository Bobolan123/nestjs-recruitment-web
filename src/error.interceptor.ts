import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof Error) {
      message = exception.message;
    }

    // this.logger.error(`HTTP Status: ${status} Error Message: ${message}`, exception.stack);
    // this.logger.error(`Path: ${request.url}`);
    // this.logger.error(`Method: ${request.method}`);
    // this.logger.error(`Body: ${JSON.stringify(request.body)}`);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
