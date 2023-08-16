import {Injectable} from "@nestjs/common";
import {RegisterUserDto} from "../user/dtos/register-user.dto";
import * as bcrypt from "bcrypt";
import {Tokens} from "./types/tokens.type";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {

  }

  hash(data: string){
    return bcrypt.hash(data, 10)
  }
  login(){

  }

  async generateAccessToken(userId: number, email:string): Promise<Tokens>{
    const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync({sub: userId, email: email}, {secret: 'at-secret', expiresIn: 15 * 60}),
        this.jwtService.signAsync({sub: userId, email: email}, {secret: 'rt-secret', expiresIn: 7 * 60 * 60 * 24})
    ])

    return {access_token, refresh_token}
  }


  async register(registerUserDto: RegisterUserDto): Promise<Tokens>{
    const hash = await this.hash(registerUserDto.password)
    registerUserDto.password = hash
    // const user = this.userService.create(registerUserDto)
    // const newUser = await this.userService.save(user)
    const newUser = await this.userService.store(registerUserDto)
    const tokens = await this.generateAccessToken(newUser.id, newUser.email)

    return tokens;
  }


  logout(){

  }


  refreshToken(){

  }
}
