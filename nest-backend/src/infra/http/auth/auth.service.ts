import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '@application/accounts/repositories/user-repository';
import { UserViewModel } from '../view-models/account/user-view-model';
import { User } from '@application/accounts/entities/user';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(userName: string, pass: string): Promise<any> {
        const user = await this.userRepository.findByUserName(userName);

        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(pass, user.password)

        if (passwordMatch) {
            return UserViewModel.toHTTP(user);
        }

        return null;
    }

    async login(user: User) {
        const tokens = await this.getTokens(user.id, user.userName);
        const refreshToken = await this.userRepository.findRefreshToken(user.id)

        if (!refreshToken) {
            const hashedRefreshToken = await this.hashData(tokens.refreshToken);
            await this.userRepository.saveRefreshToken(user.id, hashedRefreshToken)
        }

        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: UserViewModel.toHTTP(user),
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        };
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.userRepository.saveRefreshToken(userId, hashedRefreshToken);
    }

    async refreshTokens(user: any, refreshToken: string) {
        const refresh_token = await this.userRepository.findRefreshToken(user.id);

        if (!refresh_token) throw new ForbiddenException('Accesso negado')

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            refresh_token
        );

        if (!refreshTokenMatches) {
            throw new ForbiddenException('Accesso negado');
        }


        const tokens = await this.getTokens(user.sub, user.username);
        await this.updateRefreshToken(user.sub, tokens.refreshToken);
        return tokens;
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: '10m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}