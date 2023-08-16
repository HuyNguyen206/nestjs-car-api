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

    update(condition: any, data: any) {
        this.userRepo.update(condition, data)
    }

    async setNullRefreshRefreshToken(userId: number, data: any) {
        await this.userRepo.createQueryBuilder().update(User)
            .set(data)
            .where('id = :id', {id: userId})
            .andWhere('hashed_refresh_token IS NOT NULL')
            .execute()
    }

    async findUserByEmail(email: string) {
        return await this.userRepo.findOneBy({email})
    }

    // async store(registerUserDto: RegisterUserDto) {
    //     const user = this.userRepo.create(registerUserDto)
    //     const newUser = await this.userRepo.save(user)
    //
    //     return newUser
    // }
}
