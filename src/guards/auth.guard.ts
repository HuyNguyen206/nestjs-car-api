import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('guard');
    return request.session.user_id;
  }
}