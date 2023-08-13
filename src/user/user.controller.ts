import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from "@nestjs/common";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";

@Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {
  }
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto){
    return this.userService.store(createUserDto.email, createUserDto.password)
  }

  @Get('/:id')
  async findUser(@Param('id') id: number){
    console.log('handler is running')
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string){
    return this.userService.findAllUsers(email)
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDto){
    return this.userService.updateUser(id, data)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number){
    return this.userService.removeUser(id)

  }
}
