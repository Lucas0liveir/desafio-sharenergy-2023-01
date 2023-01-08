import { Injectable } from "@nestjs/common";
import { Address } from "../entities/address";
import { Customer } from "../entities/customer";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerNotFound } from "./errors/customer-not-found";

interface EditCustomerRequest {
    customer: Customer;
    userId: string;
}

interface EditCustomerResponse {
    customer: Customer
}

@Injectable()
export class EditCustomer {

    constructor(
        private customerRepository: CustomerRepository
    ) { }

    async execute(request: EditCustomerRequest): Promise<EditCustomerResponse> {

        const { customer, userId } = request

        const customerToEdit = await this.customerRepository.findById(customer.id, userId)
        
        if (!customerToEdit) {
            throw new CustomerNotFound("Cliente não encontrado")
        }

        const newCustomer = new Customer({
            adress: new Address({
                city: customer.adress.city,
                neighborhood: customer.adress.neighborhood,
                number: customer.adress.number,
                street: customer.adress.street,
                uf: customer.adress.uf,
                createdAt: customerToEdit.adress.createdAt
            }, customerToEdit.adress.id),
            cellPhone: customer.cellPhone,
            cpf: customer.cpf,
            email: customer.email,
            name: customer.name,
            userId,
            createdAt: customerToEdit.createdAt
        }, customerToEdit.id)

        await this.customerRepository.save(newCustomer)

        return { customer: newCustomer }
    }
}