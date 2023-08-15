import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "../user/dtos/register-user.dto";
import { Tokens } from "./types/tokens.type";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Post('/login')
  login(){
    this.authService.login()
  }

  @Post('/register')
  register(registerUserDto: RegisterUserDto): Promise<Tokens>{
    this.authService.register(registerUserDto)
  }

  @Post('/logout')
  logout(){
    this.authService.logout()

  }

  @Post('/refresh')
  refreshToken(){
    this.authService.refreshToken()

  }


}
