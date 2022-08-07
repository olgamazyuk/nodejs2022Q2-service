import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log = (message: string, ...optionalParams: any[]) => {
    console.log(message, optionalParams);
  };

  error = (message: string, ...optionalParams: any[]) => {
    console.log(message, optionalParams);
  };

  warn = (message: string, ...optionalParams: any[]) => {
    console.log(message, optionalParams);
  };

  debug = (message: string, ...optionalParams: any[]) => {
    console.log(message, optionalParams);
  };

  verbose = (message: string, ...optionalParams: any[]) => {
    console.log(message, optionalParams);
  };
}
