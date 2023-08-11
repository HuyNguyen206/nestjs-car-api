import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {

  }
  store(email: string, password: string){
    const user = this.userRepo.create({email, password})

    return this.userRepo.save(user)
  }

  findOne(id: number){
    return this.userRepo.findOneBy({id})
  }

  findAllUsers(email: string
  ){
    return this.userRepo.find({where: { email }})
  }

  updateUser() {
    return this.userRepo.update()
  }

  removeUser() {
    return this.userRepo.remove()

  }
}
