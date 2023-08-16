import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "./dtos/register-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {

    }

    async store(registerUserDto: RegisterUserDto) {
        const user = this.userRepo.create(registerUserDto)
        const newUser = await this.userRepo.save(user)

        return newUser
    }
}
