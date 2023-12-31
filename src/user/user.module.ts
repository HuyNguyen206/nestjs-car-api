import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, AuthService,
  //   {
  //   provide: APP_INTERCEPTOR,
  //   useClass: CurrentUserInterceptor
  // }
  ],
  controllers: [UserController]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
  consumer.apply(CurrentUserMiddleware).forRoutes('*')
}}
