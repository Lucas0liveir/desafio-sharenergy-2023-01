import { AuthService } from '@infra/http/auth/auth.service';
import { LocalAuthGuard } from '@infra/http/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from '@infra/http/auth/guards/refresh-token.guard';
import { UserLoginBody } from '@infra/http/dtos/accounts/user-login-body';
import { Controller, Request, Post, UseGuards, Req, Body, UnauthorizedException } from '@nestjs/common';

@Controller('accounts')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req,
        @Body() userLoginBody?: UserLoginBody) {
        return this.authService.login(req.user)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('auth/refresh-token')
    refreshTokens(@Req() req) {
        const user = req.user
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(user, refreshToken);
    }

}