import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "../user/dtos/register-user.dto";
import {Tokens} from "./types/tokens.type";
import {LoginUserDto} from "../user/dtos/login-user.dto";
import {RefreshTokenGuard} from "../common/guards/refresh-token.guard";
import {GetCurrentUser} from "../common/decorators/get-current-user.decorator";
import {GetCurrentUserId} from "../common/decorators/get-current-user-id.decorator";
import {Public} from "../common/decorators/publish.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto){
   return  this.authService.login(loginUserDto)
  }


  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<Tokens>{
    return await this.authService.register(registerUserDto)
  }

  @HttpCode(HttpStatus.OK)
  // @UseGuards(AccessTokenGuard)
  @Post('/logout')
  logout(@GetCurrentUserId() userId: number){
    this.authService.logout(userId)

  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  async refreshToken(@GetCurrentUser() user: any){

    return await this.authService.refreshToken(user.sub, user.email, user.refresh_token)
  }


}
