import IHttpRequest from "../adapters/httpRequest/IHttpRequest.adapter";
import { httpRequest } from "./httpRequestDefault";

export interface Customer {
    id: string;
    email: string;
    userId: string;
    name: string;
    cpf: string;
    cellPhone: string;
    address: {
        id: string
        street: string
        neighborhood: string
        number: number;
        city: string;
        uf: string;
    }
}

interface CustomersQuery {
    skip: number;
    take: number;
    name: string;
}

type CustomerResponse = {
    customers: Customer[]
    hasMore: boolean
}

class CustomersService {

    constructor(
        private readonly httpRequest: IHttpRequest
    ) {

    }

    async findAll({ name, skip, take }: CustomersQuery): Promise<CustomerResponse> {

        const { data } = await this.httpRequest.get<CustomerResponse>(`/customer?skip=${skip}&take=${take}&name=${name}`)

        return { customers: data.customers, hasMore: data.hasMore }
    }

    async edit(customer: Customer) {
        return await this.httpRequest.put("/customer/edit", { ...customer })
    }

    async create(customer: Customer) {
        return await this.httpRequest.post("/customer/create", { ...customer })
    }

    async delete(id: string) {
        return await this.httpRequest.delete(`/customer?id=${id}`)
    }


}

export const customerService = new CustomersService(httpRequest)