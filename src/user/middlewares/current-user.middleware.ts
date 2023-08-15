import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { UserService } from "../user.service";
import { User } from "../user.entity";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService){

  }
  async use(req: any, res: Response, next: NextFunction) {
    const { user_id } = req.session || {}
    if (user_id) {
      const currentUser = await this.userService.findOne(user_id)
      req.currentUser = currentUser
    }

     next();
  }

}