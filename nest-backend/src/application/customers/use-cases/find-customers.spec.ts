import { makeCustomer } from "@test/factories/customers/customer-factory"
import { InMemoryCustomerRepository } from "@test/repositories/customers/in-memory-customer-repository"
import { FindCustomers } from "./find-customers"

describe("Find user customer", () => {
    it("should be able to find a user customer by userId", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const findUserCustomers = new FindCustomers(customerRepository)

        const customer = makeCustomer({ userId: "user-1", name: "maria" })
        const customer2 = makeCustomer({ userId: "user-1", name: "joao" })
        const customer3 = makeCustomer({ userId: "user-2" })

        await customerRepository.create(customer)
        await customerRepository.create(customer2)
        await customerRepository.create(customer3)

        const { customers } = await findUserCustomers.execute({
            userId: "user-1",
            skip: 0,
            take: 10
        })

        expect(customers).toHaveLength(2)
        expect(customerRepository.customers).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ name: "maria" }) }),
            expect.objectContaining({ props: expect.objectContaining({ name: "joao" }) })
        ]))
    })

    it("should be able to find a user customer by name", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const findUserCustomers = new FindCustomers(customerRepository)

        const customer = makeCustomer({ userId: "user-1", name: "maria" })
        const customer2 = makeCustomer({ userId: "user-1", name: "maria rosa" })
        const customer3 = makeCustomer({ userId: "user-2", name: "ana maria" })
        const customer4 = makeCustomer({ userId: "user-2", name: "maria clara" })

        await customerRepository.create(customer)
        await customerRepository.create(customer2)
        await customerRepository.create(customer3)
        await customerRepository.create(customer4)

        const { customers } = await findUserCustomers.execute({
            userId: "user-1",
            skip: 0,
            take: 10,
            name: "mar"
        })

        expect(customers).toHaveLength(2)
        expect(customers).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ name: "maria" }) }),
            expect.objectContaining({ props: expect.objectContaining({ name: "maria rosa" }) })
        ]))
    })
})