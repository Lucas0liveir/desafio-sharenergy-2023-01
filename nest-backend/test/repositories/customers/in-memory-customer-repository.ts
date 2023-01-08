import { Customer } from "@application/customers/entities/customer";
import { CustomerRepository } from "@application/customers/repositories/customer-repository";
import { Pagination, Response, WhereInput } from "@application/dto";

export class InMemoryCustomerRepository extends CustomerRepository {

    public customers: Customer[] = []

    async create(customer: Customer): Promise<void> {
        this.customers.push(customer)
    }

    async findById(id: string, userId: string): Promise<Customer> {
        return this.customers.find(customer => customer.id === id && customer.userId === userId)
    }

    async findByUserId(userId: string, { skip, take }: Pagination): Promise<Response<Customer>> {

        const customers = this.customers.filter(customer => customer.userId === userId)

        const total = this.customers.length

        return { data: customers.slice(skip, skip + take), total }
    }

    async findByName({ name, userId }: WhereInput, { skip, take }: Pagination): Promise<Response<Customer>> {
        const customers = this.customers.filter(customer => customer.name.includes(name) && customer.userId === userId)

        const total = this.customers.length
        const data = customers.slice(skip, skip + take)

        return { data, total }
    }

    async save(customer: Customer): Promise<void> {
        const customerIndex = this.customers.findIndex(item => item.id === customer.id)

        if (customerIndex >= 0) {
            this.customers[customerIndex] = customer
        }

    }

    async delete(id: string, userId: string): Promise<void> {
        const customerIndex = this.customers.findIndex(item => item.id === id && item.userId === userId)

        if (customerIndex >= 0) {
            this.customers.splice(customerIndex, 1)
        }
    }
}