import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AccessTokenStrategy} from "./strategies/access-token.strategy";
import {RefreshTokenStrategy} from "./strategies/refresh-token.strategy";
import {AuthService} from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
