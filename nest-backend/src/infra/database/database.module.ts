import { UserRepository } from "@application/accounts/repositories/user-repository";
import { CustomerRepository } from "@application/customers/repositories/customer-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUserRepository } from "./prisma/repositories/accounts/prisma-user-repository";
import { PrismaCustomerRepository } from "./prisma/repositories/customers/prisma-customer-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: CustomerRepository,
            useClass: PrismaCustomerRepository
        }
    ],
    exports: [
        UserRepository,
        CustomerRepository
    ]
})
export class DataBaseModule { }