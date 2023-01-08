import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerNotFound } from "./errors/customer-not-found";

interface DeleteCustomerRequest {
    userId: string;
    id: string;
}

@Injectable()
export class DeleteCustomer {
    constructor(
        private customerRepository: CustomerRepository
    ) { }

    async execute(request: DeleteCustomerRequest): Promise<void> {
        const { id, userId } = request
        const customer = await this.customerRepository.findById(id, userId)

        if (!customer) {
            throw new CustomerNotFound("Cliente não encontrado")
        }
        await this.customerRepository.delete(customer.id, userId)
    }
}