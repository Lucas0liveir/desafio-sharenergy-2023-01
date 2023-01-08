import { AuthService } from '@infra/http/auth/auth.service';
import { LocalAuthGuard } from '@infra/http/auth/guards/local-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserRepository } from '@application/accounts/repositories/user-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/accounts/prisma-user-repository';

const authServiceMock = {
    login: jest.fn(),
};

const userRepositoryMock = {
    findByUserName: jest.fn(),
};

describe('LoginController', () => {
    jest.setTimeout(30000)
    let loginController: AuthController;
    let authGuard: LocalAuthGuard;
    let authService: AuthService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: UserRepository, useClass: PrismaUserRepository },
                { provide: AuthService, useValue: authServiceMock },
                PrismaService
            ]
        })
            .overrideProvider(UserRepository)
            .useValue(userRepositoryMock)
            .compile();

        loginController = module.get<AuthController>(AuthController);
        authGuard = module.get<LocalAuthGuard>(LocalAuthGuard);
        authService = module.get<AuthService>(AuthService);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be able to authenticate', async () => {
        const username = 'user';
        const password = 'password';
        const result = {
            user: {
                id: "testeid",
                userName: "teste",
                email: "teste@email.com"
            },
            refresh_token: 'test_refresh_token',
            access_token: 'test_token'
        }

        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);
        jest.spyOn(authService, 'login').mockImplementation(async () => (result));

        expect(await loginController.login({ username, password })).toBe(result);
    });
});
