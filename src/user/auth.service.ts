import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dtos/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async register(user :CreateUserDto){
        const users = await this.userService.findAllUsers(user.email)
        if (users.length) {
            throw new UnprocessableEntityException('The email is already registered')
        }

       return this.userService.store(user.email, user.password)
    }

    login(){

    }
}
