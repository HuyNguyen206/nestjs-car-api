import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToClass} from "class-transformer";

interface ClassContsructor {
    new (...args: any[]): NonNullable<unknown>
}
export function Serialize(dto: ClassContsructor)  {
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassContsructor) {
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('i am running before a request is handle by request handler ', context)

        return next.handle().pipe(
            map((data:any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
                console.log('i am running before response is send out', data)
            })
        )
    }
}