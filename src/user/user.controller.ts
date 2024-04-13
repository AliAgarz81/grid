import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './user.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() dto: UserDto, @Res({ passthrough: true }) res) {
        const response = await this.userService.signIn(dto);
        res.cookie('token', response.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        }).send("Login Successfully");
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('logout')
    logOut(@Res( { passthrough: true } ) res) {
        res.cookie('token', '').send('Logout successfully');
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() userDto: UserDto) {
        return this.userService.seedUser(userDto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('name')
    getName(@Req() req) {
        return req.user.username;
    }

    @HttpCode(HttpStatus.OK)
    @Get('check')
    checkLogged(@Req() req: Request) {
        if(req.cookies['token'] !== ''){
            return 'Logged'
        } else {
            return 'Not logged'
        }
    }
}
