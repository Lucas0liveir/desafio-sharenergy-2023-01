import { Customer } from "@application/customers/entities/customer";
import { CustomerRepository } from "@application/customers/repositories/customer-repository";
import { Pagination, Response, WhereInput } from "@application/dto";
import { Injectable } from "@nestjs/common";
import { PrismaCustomerMapper } from "../../mappers/customers/customer-mapper";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(customer: Customer): Promise<void> {
        const raw = PrismaCustomerMapper.toPrisma(customer)

        await this.prisma.address.create({
            data: {
                ...raw.address
            }
        })

        await this.prisma.customer.create({
            data: {
                ...raw.customer,
                addressId: customer.adress.id
            }
        })
    }

    async findById(id: string, userId: string): Promise<Customer> {

        const customer = await this.prisma.customer.findUnique({
            where: {
                id
            },
            include: {
                address: true
            }
        })

        if (!customer) {
            return null
        }

        if (customer.userId === userId) {
            return PrismaCustomerMapper.toDomain(customer)
        }

        return null
    }

    async findByUserId(userId: string, { skip, take }: Pagination): Promise<Response<Customer>> {

        const customers = await this.prisma.customer.findMany({
            skip,
            take,
            where: {
                userId
            },
            include: {
                address: true
            },
            orderBy: {
                name: "asc"
            }
        })

        const total = await this.prisma.customer.count({
            where: {
                userId
            }
        })

        return { data: customers.map(PrismaCustomerMapper.toDomain), total }
    }

    async findByName({ name, userId }: WhereInput, { skip, take }: Pagination): Promise<Response<Customer>> {
        const customers = await this.prisma.customer.findMany({
            take,
            skip,
            where: {
                AND: [
                    {
                        name: {
                            contains: name,
                            mode: "insensitive"
                        }
                    },
                    {
                        userId
                    }
                ]
            },
            include: {
                address: true
            },
            orderBy: {
                name: "asc"
            }
        })

        const total = await this.prisma.customer.count({
            where: {
                userId
            }
        })

        return { data: customers.map(PrismaCustomerMapper.toDomain), total }
    }

    async save(customer: Customer): Promise<void> {
        const raw = PrismaCustomerMapper.toPrisma(customer)

        await this.prisma.address.update({
            where: {
                id: raw.address.id,
            },
            data: {
                city: raw.address.city,
                neighborhood: raw.address.neighborhood,
                number: raw.address.number,
                street: raw.address.street,
                uf: raw.address.uf,
                updated_at: raw.address.updated_at
            }
        })

        await this.prisma.customer.update({
            where: {
                id: customer.id
            },
            data: {
                name: raw.customer.name,
                cpf: raw.customer.cpf,
                cell_phone: raw.customer.cell_phone,
                email: raw.customer.email,
                updated_at: raw.customer.updated_at
            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.customer.delete({
            where: {
                id
            }
        })
    }

}