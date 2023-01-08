import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';

describe('Login (e2e)', () => {
    let app: INestApplication;
    let server;

    beforeEach(async () => {
        try {
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

            app = moduleFixture.createNestApplication();
            await app.init();

            server = app.getHttpServer()
        } catch (e) {
            console.log("=>>>>", e);

        }
    });

    afterEach(async () => {
        await app.close();
        server.close()
    })

    it('should return an access token when login is successful', () => {

        request(app.getHttpServer())
            .post('/accounts/auth/login')
            .send({
                username: 'desafiosharenergy',
                password: 'sh@r3n3rgy',
            })
            .expect(201)
            .expect(response => {
                expect(response.body).toHaveProperty('access_token');
            });

    });

    it('should return an error if login is unsuccessful', () => {
        request(app.getHttpServer())
            .post('/accounts/auth/login')
            .send({
                username: 'desafiosharenergy',
                password: 'incorrect-password',
            })
            .expect(401)
            .expect({
                statusCode: 401,
                message: 'usuário ou senha incorretos',
                error: 'Unauthorized'
            });
    });

});
