import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {RegisterUserDto} from "../user/dtos/register-user.dto";
import * as bcrypt from "bcrypt";
import {Tokens} from "./types/tokens.type";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {LoginUserDto} from "../user/dtos/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    hash(data: string) {
        return bcrypt.hash(data, 10)
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findUserByEmail(loginUserDto.email)
        if (!user) {
            throw new UnauthorizedException('Email is invalid')
        }
        const isMatchPassword = await bcrypt.compare(loginUserDto.password, user.password)

        if (!isMatchPassword) {
            throw new UnauthorizedException('Password is invalid')
        }

        const tokens = await this.generateAccessToken(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token)

        return tokens;
    }

    async generateAccessToken(userId: number, email: string): Promise<Tokens> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({sub: userId, email: email}, {secret: 'at-secret', expiresIn: 15 * 60}),
            this.jwtService.signAsync({sub: userId, email: email}, {secret: 'rt-secret', expiresIn: 7 * 60 * 60 * 24})
        ])

        return {access_token, refresh_token}
    }

    async register(registerUserDto: RegisterUserDto): Promise<Tokens> {
        const hash = await this.hash(registerUserDto.password)
        registerUserDto.password = hash
        // const user = this.userService.create(registerUserDto)
        // const newUser = await this.userService.save(user)
        const newUser = await this.userService.store(registerUserDto)
        const tokens = await this.generateAccessToken(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refresh_token)

        return tokens;
    }


    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hash(rt);

        this.userService.update({id: userId}, {hashed_refresh_token: hash})
    }

    async logout(userId: number) {
        await this.userService.setNullRefreshRefreshToken(userId, {hashed_refresh_token: null})
    }

    async refreshToken(userId: number, email: string, rt: string) {
        const user = await this.userService.findUserByEmail(email)
        if (!user) {
            throw new NotFoundException('User is not exists')
        }

        if (!user.hashed_refresh_token) {
            throw new UnauthorizedException('Refresh token is invalid')
        }

        const isCorrectRt = await bcrypt.compare(rt, user.hashed_refresh_token)
        if (!isCorrectRt) {
            throw new UnauthorizedException('Refresh token is invalid')
        }

        const tokens = await this.generateAccessToken(userId, email)
        await this.updateRtHash(userId, tokens.refresh_token)

        return tokens
    }
}
