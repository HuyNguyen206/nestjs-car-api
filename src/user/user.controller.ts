import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "../guards/auth.guard";

// @UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto)
@Controller("auth")
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {
  }

  @Get("colors/:color")
  setColors(@Param("color") color: string, @Session() session: Record<string, any>) {
    console.log(123);
    session.color = color;
  }

  @Get("colors")
  getColor(@Session() session: Record<string, any>) {
    return session.color;
  }

  // @Get("me")
  // async me(@Session() session: Record<string, any>) {
  //   const user = await this.userService.findOne(session.user_id)
  //
  //   return user;
  // }
  @Get("me")
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User) {
    console.log(user);
    // const user = await this.userService.findOne(session.user_id)

    return user;
  }

  @Post("/register")
  async register(@Body() createUserDto: CreateUserDto, @Session() session: Record<string, any>) {
    const user = await this.authService.register(createUserDto);
    session.user_id = user.id;
    return user;
  }

  @Post("/login")
  async login(@Body() createUserDto: CreateUserDto, @Session() session: Record<string, any>) {
    const user = await this.authService.login(createUserDto);
    session.user_id = user.id;
    return user;
  }

  @Post("/logout")
   logout(@Session() session: Record<string, any>) {
    session.user_id = null;
  }

  @Get("/:id")
  async findUser(@Param("id") id: number) {
    console.log("handler is running");
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found");
    }

    return user;
  }

  @Get()
  findAllUsers(@Query("email") email: string) {
    return this.userService.findAllUsers(email);
  }

  @Put("/:id")
  updateUser(@Param("id") id: number, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(id, data);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: number) {
    return this.userService.removeUser(id);

  }
}
