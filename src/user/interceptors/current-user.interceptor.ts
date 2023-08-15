import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class CurrentUserInterceptor implements  NestInterceptor {
  constructor(private userService: UserService) {

  }
  async intercept(context: ExecutionContext, next: CallHandler<any>){
    const request = context.switchToHttp().getRequest()
    const {user_id} = request.session || {}
    console.log('intercept');

    if (user_id) {
      const user = await this.userService.findOne(user_id)
      request.currentUser = user
    }

    return next.handle()
  }

}