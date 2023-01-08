import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer";
import { CustomerRepository } from "../repositories/customer-repository";

interface FindCustomersRequest {
    userId: string;
    skip: number;
    take: number;
    name?: string;
}

interface FindCustomersResponse {
    customers: Customer[];
    total: number;
}

@Injectable()
export class FindCustomers {

    constructor(
        private customerRepository: CustomerRepository
    ) { }

    async execute(request: FindCustomersRequest): Promise<FindCustomersResponse> {

        const { userId, name, skip, take } = request

        if (name) {

            const where = {
                userId,
                name
            }

            const { data, total } = await this.customerRepository.findByName(where, { skip, take })
            return { customers: data, total }
        }

        const { data, total } = await this.customerRepository.findByUserId(userId, { skip, take })
        return { customers: data, total }
    }
}