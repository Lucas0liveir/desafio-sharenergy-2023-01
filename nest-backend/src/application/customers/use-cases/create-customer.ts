import { Injectable } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";
import { Address } from "../entities/address";
import { Customer } from "../entities/customer";

type AddressRequest = {
    street: string;
    city: string;
    uf: string;
    number: number;
    neighborhood: string;
}

interface CreateCustomerRequest {
    name: string;
    email: string;
    cpf: string;
    cellPhone: string;
    adressDTO: AddressRequest;
    userId: string;
}

interface CreateCustomerResponse {
    customer: Customer
}

@Injectable()
export class CreateCustomer {

    constructor(
        private customerRepository: CustomerRepository
    ) { }

    async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
        const { adressDTO, cellPhone, cpf, email, name, userId } = request

        const adress = new Address(adressDTO)

        const customer = new Customer({
            adress,
            cellPhone,
            cpf,
            email,
            name,
            userId
        })

        await this.customerRepository.create(customer)

        return { customer }
    }
}