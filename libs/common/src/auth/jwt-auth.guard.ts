import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "./services";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const auth = this.getAuthentication(context);

    this.logger.log(`Authenticating user with token: ${auth}`);

    return this.authClient.send('validate_user', { Authentication: auth }).pipe(

      tap(res => {

        this.logger.log(`User authenticated: ${res}`);

        if (!res) {
          throw new UnauthorizedException('Invalid Authentication');
        }
        this.addUser(res, context);
      }),
      catchError(() => {
        throw new UnauthorizedException('Invalid Authentication');
      }
      )
    );
  }


  private getAuthentication(context: ExecutionContext) {

    let auth: string;

    if (context.getType() === 'rpc') {
      auth = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      auth = context.switchToHttp().getRequest().cookies?.Authentication;
    }

    if (!auth) {
      throw new UnauthorizedException('No value provide for Authentication');
    }


    return auth;

  }

  private addUser(user: any, context: ExecutionContext) {
    console.log('addUser', user);
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
