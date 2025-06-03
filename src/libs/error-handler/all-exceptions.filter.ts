import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '@libs/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private HAS_DEFAULT_MESSAGE = [
    HttpStatus.UNAUTHORIZED,
    HttpStatus.FORBIDDEN,
    HttpStatus.TOO_MANY_REQUESTS,
    HttpStatus.INTERNAL_SERVER_ERROR,
  ];

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.loggerService.error({
      stack: (exception as Error).stack,
      message: `ERROR | ${ctx.getResponse<Request>().method} | ${
        ctx.getResponse<Request>().url
      }`,
    });

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const data =
      exception instanceof HttpException
        ? exception.getResponse()['data']
        : null;

    const message = this.formatCustomMessage(exception);
    httpAdapter.reply(ctx.getResponse(), { message, data }, httpStatus);
  }

  private getDefaultMessage(httpStatus: number): string[] {
    const defaultMessages: Record<number, string[]> = {
      [HttpStatus.UNAUTHORIZED]: ['UNAUTHORIZED'],
      [HttpStatus.FORBIDDEN]: ['FORBIDDEN'],
      [HttpStatus.TOO_MANY_REQUESTS]: ['TOO_MANY_REQUESTS'],
      [HttpStatus.INTERNAL_SERVER_ERROR]: ['INTERNAL_SERVER_ERROR'],
      [HttpStatus.CONFLICT]: ['CONFLICT'],
    };

    return defaultMessages[httpStatus];
  }

  private formatCustomMessage(exception: unknown): string[] {
    if (!(exception instanceof HttpException)) {
      return this.getDefaultMessage(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = exception.getResponse() as Record<string, any>;

    if (Array.isArray(response['message'])) {
      return response['message'];
    }

    return [response['message'] || response];
  }
}
