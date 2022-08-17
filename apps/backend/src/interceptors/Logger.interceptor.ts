import { BadGatewayException, CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap, throwError } from "rxjs"
import { catchError } from 'rxjs/operators';

class RouteInfo {
  res: Response;
  req: Request;
  start: Date;

  get reqPath() {
    return `${this.req.method} ${this.req.path} ${this.res.statusCode}`
  }

  get age() {
    if (!this.start) return 0;
    return new Date().getMilliseconds() - this.start.getMilliseconds()
  }

  generateMessage() {
    const query = JSON.stringify(this.req.query)
    return `${this.reqPath}, ${query} ${this.age} MS`
  }
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  logger = new Logger('LoggerRouteInterceptor')

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const [req, res, _next]: [Request, Response, any] = context.getArgs();
    let routeInfo = new RouteInfo()
    routeInfo.start = new Date()
    routeInfo.res = res
    routeInfo.req = req
    return next
      .handle()
      .pipe(
        tap(() => this.logRoute(routeInfo)),
        catchError(err => this.logCatchError(routeInfo, err)),
      )
  }

  logRoute(routeInfo: RouteInfo) {
    this.logger.log(routeInfo.generateMessage())
  }

  logCatchError(routeInfo: RouteInfo, err: any): any {
    this.logger.error(routeInfo.generateMessage() + ", Failed")
    this.logger.error(err)
    // check if error from typeorm
    if (err.query) {
      throw new BadGatewayException({
        message: "Failed to find data. please check API correctly"
      })
    }
    throw new BadGatewayException(err)
  }
}