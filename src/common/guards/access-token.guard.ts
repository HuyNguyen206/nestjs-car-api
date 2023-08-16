import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import {ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super()
    }

    canActivate(context: ExecutionContext): boolean{
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass()
        ]);

       return isPublic || super.canActivate(context);
    }
}