import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty } from '@nestjs/swagger';

import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';

export class UserLogin {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() model: UserLogin) {
        return this.authService.login(model);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile() {
        return 'This is profile';
    }
}
