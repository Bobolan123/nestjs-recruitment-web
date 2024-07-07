import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        const isValidPassword = await bcrypt.compare(pass, user.password);
        if (user && isValidPassword) {
            const { password, age, location, ...result } = user;
            return result;
        }
        return null;
    }

    async register(user: CreateUserDto) {
        const isExist = await this.usersService.create(user);
        if (!isExist) {
            throw new BadRequestException(`The ${user.email} exists`);
        }
    }
    async login(user: User, response: Response) {
        const payload = {
            sub: 'token login',
            iss: 'from server',
            name: user.name,
            email: user.email,
            id: user.id,
            role: user.role.name,
        };

        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
            secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
        });

        response.clearCookie('refresh_token')
        //set refresh token in cookie
        response.cookie('refresh_token', refresh_token, {
            maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRATION_COOKIE'),
            httpOnly: true,
        });
 
        return {
            email: user.email,
            name: user.name,
            id: user.id,
            role: user.role.name,
            access_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
            }),
        };
    }

    async refreshToken(refresh_token:string, response:Response) {
        try {
            const decoded_token = this.jwtService.verify(refresh_token,{
                secret:this.configService.get<string>('JWT_REFRESH_TOKEN')
            })
            const user = await this.usersService.findOneByToken(decoded_token?.id)
            if (user) {
                const res = this.login(user, response)
                return res
            } else {
                throw new BadRequestException('Refresh token are not valid. Login please')
            }
        } catch (error) { 
            console.log(error)
        }
    }

    logout(res:Response) {
        res.clearCookie('refresh_token')
        return 'ok'
    }
}
