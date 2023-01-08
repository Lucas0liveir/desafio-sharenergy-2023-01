import { Address } from "@application/customers/entities/address";
import { Customer } from "@application/customers/entities/customer";

import { Customer as RawCustomer, Address as RawAddress } from "@prisma/client";

export class PrismaCustomerMapper {
    static toPrisma(customer: Customer) {
        return {
            customer: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                cell_phone: customer.cellPhone,
                cpf: customer.cpf,
                userId: customer.userId,
                created_at: customer.createdAt,
                updated_at: customer.updatedAt
            },
            address: {
                id: customer.adress.id,
                street: customer.adress.street,
                city: customer.adress.city,
                uf: customer.adress.uf,
                number: customer.adress.number,
                neighborhood: customer.adress.neighborhood,
                created_at: customer.adress.createdAt,
                updated_at: customer.adress.updatedAt,
            }
        }
    }

    static toDomain(rawCustomer: RawCustomer & { address: RawAddress }) {
        return new Customer({
            cellPhone: rawCustomer.cell_phone,
            cpf: rawCustomer.cpf,
            email: rawCustomer.email,
            name: rawCustomer.name,
            userId: rawCustomer.userId,
            createdAt: rawCustomer.created_at,
            updatedAt: rawCustomer.created_at,
            adress: new Address({
                city: rawCustomer.address.city,
                neighborhood: rawCustomer.address.neighborhood,
                number: rawCustomer.address.number,
                street: rawCustomer.address.street,
                uf: rawCustomer.address.uf,
                createdAt: rawCustomer.address.created_at,
                updatedAt: rawCustomer.address.updated_at
            }, rawCustomer.address.id)
        }, rawCustomer.id)
    }
}