import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    constructor() {
        super({
            log: ['query']
        })
    }

    async onModuleInit() {

        await this.$connect();
        const password = await bcrypt.hash("sh@r3n3rgy", 10)
        await this.user.upsert({
            where: { username: "desafiosharenergy" },
            update: {
                email: 'desafiosharenergy@sharenergy.com',
                username: 'desafiosharenergy'
            },
            create: {
                email: 'desafiosharenergy@sharenergy.com',
                username: 'desafiosharenergy',
                password
            }
        })
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}