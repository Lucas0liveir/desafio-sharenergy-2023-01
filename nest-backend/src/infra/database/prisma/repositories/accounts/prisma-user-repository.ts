import { User } from "@application/accounts/entities/user";
import { UserRepository } from "@application/accounts/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { UserMapper } from "../../mappers/accounts/user-mapper";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(user: User): Promise<void> {
        const raw = UserMapper.toPrisma(user)

        await this.prisma.user.upsert({
            where: {
                email: raw.email
            },
            update: {},
            create: raw
        })
    }

    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return null
        }

        return UserMapper.toDomain(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return null
        }

        return UserMapper.toDomain(user)
    }

    async findByUserName(username: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            return null
        }

        return UserMapper.toDomain(user)
    }

    async save(user: User): Promise<void> {
        const raw = UserMapper.toPrisma(user)

        await this.prisma.user.update({
            where: {
                id: user.id
            },

            data: raw
        })
    }

    async findRefreshToken(userId: string): Promise<string> {
        const { refresh_token } = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                refresh_token: true
            }
        })

        if (!refresh_token) {
            return null
        }

        return refresh_token
    }

    async saveRefreshToken(userId: string, hashRefreshToken: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refresh_token: hashRefreshToken
            }
        })
    }


}