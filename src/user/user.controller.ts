import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./user.service";

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {
  }
  @Post('/register')
  store(@Body() createUserDto: CreateUserDto){
    return this.userService.store(createUserDto.email, createUserDto.password)
  }
}
