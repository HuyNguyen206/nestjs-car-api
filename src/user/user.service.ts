import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {

    }

    store(email: string, password: string) {
        const user = this.userRepo.create({email, password})

        return this.userRepo.save(user)
    }

    findOne(id: number) {
        return this.userRepo.findOneBy({id})
    }

    findAllUsers(email: string
    ) {
        return this.userRepo.find({where: {email}})
    }

    async updateUser(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('the user not found')
        }
        Object.assign(user, attrs)

        return this.userRepo.save(user)
    }

    async  removeUser(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('the user not found')
        }

        return this.userRepo.remove(user)
    }
}
