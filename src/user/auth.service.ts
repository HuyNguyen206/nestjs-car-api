import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
    }

    async register(user :CreateUserDto){
        const users = await this.userService.findAllUsers(user.email)
        if (users.length) {
            throw new UnprocessableEntityException('The email is already registered')
        }

        const salt = randomBytes(8).toString('hex')
        const hash = await scrypt(user.password, salt, 32) as Buffer
        const password = salt + '.' + hash.toString('hex')

        return this.userService.store(user.email, password)
    }

    async login(userData :CreateUserDto){
        const [user] = await this.userService.findAllUsers(userData.email)
        if (!user) {
            throw new UnauthorizedException('The email is invalid')
        }
        const [salt, correctHash] = user.password.split('.')
        console.log(salt, correctHash);
        const buffer = await scrypt(userData.password, salt, 32) as Buffer

        if (correctHash !== buffer.toString('hex')) {
            throw new UnauthorizedException('The password is invalid')
        }

        return user
    }
}
