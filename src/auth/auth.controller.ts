import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common'

import { GetCurrentUser } from '../common/decorators'
import { AccessTokenGuard, RefreshTokenGuard } from '../common/guards'
import { AuthDto, ResponseAuthDto, ResponseRefreshDto } from './dtos'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(201)
    @Post('signup')
    signup(
        @Body() dto: AuthDto,
        @Res({passthrough: true}) res): Promise<ResponseAuthDto> {
        return this.authService.signup(dto, res)
    }

    @HttpCode(200)
    @Post('login')
    login(
        @Body() dto: AuthDto,
        @Res({passthrough: true}) res): Promise<ResponseAuthDto> {
        return this.authService.login(dto, res)
    }

    @HttpCode(200)
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refresh(
        @Res({passthrough: true}) res,
        @GetCurrentUser('id') id,
        @GetCurrentUser('refreshToken') token): Promise<ResponseRefreshDto> {
        return this.authService.refresh(res, id, token)
    }

    @HttpCode(200)
    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(
        @Res({passthrough: true}) res,
        @GetCurrentUser('id') id): Promise<boolean> {
        return this.authService.logout(res, id)
    }
}