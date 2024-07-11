import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Res,
    Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ReqExpress, Response } from 'express';
import { Public } from './Public';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Public()
    @ResponseMessage('User Register')
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
    
    @Public()
    @UseGuards(LocalAuthGuard)
    @ResponseMessage('User Login')
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(req.user, res);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @ResponseMessage('Refresh token')
    @Post('refresh')
    refreshToken(
        @Request() req: ReqExpress,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refresh_token = req.cookies['refresh_token'];
        return this.authService.refreshToken(refresh_token, res);
    }

    @ResponseMessage('User Login')
    @Post('logout')
    async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }

    @ResponseMessage('Get user information')
    @Post('account')
    getUserAccount(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res);
    }
}
