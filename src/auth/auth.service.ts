import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { RegisterUserDto } from "../user/dtos/register-user.dto";
import * as bcrypt from "bcrypt";
import { Tokens } from "./types/tokens.type";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {

  }

  hash(data: string){
    return bcrypt.hash(data, 10)
  }
  login(){

  }


  async register(registerUserDto: RegisterUserDto): Promise<Tokens>{
    const hash = await this.hash(registerUserDto.password)
    registerUserDto.password = hash
    const user = this.userRepo.create(registerUserDto)

    const newUser = this.userRepo.save(user)
  }


  logout(){

  }


  refreshToken(){

  }
}
