import { Pagination, Response, WhereInput } from "@application/dto";
import { Customer } from "../entities/customer";



export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<void>;
    abstract findById(id: string, userId: string): Promise<Customer | null>;
    abstract findByUserId(userId: string, pagination: Pagination): Promise<Response<Customer> | null>;
    abstract findByName(where: WhereInput, pagination: Pagination): Promise<Response<Customer> | null>;
    abstract save(customer: Customer): Promise<void>;
    abstract delete(id: string, userId: string): Promise<void>;
}