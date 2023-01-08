import { makeCustomer } from "@test/factories/customers/customer-factory"
import { InMemoryCustomerRepository } from "@test/repositories/customers/in-memory-customer-repository"
import { DeleteCustomer } from "./delete-customer"

describe("Delete user customer", () => {
    it("should be able to delete a user customer", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const deleteUserCustomer = new DeleteCustomer(customerRepository)

        const customer = makeCustomer({ userId: "user-1", name: "maria" })
        const customer2 = makeCustomer({ userId: "user-1", name: "joao" })
        const customer3 = makeCustomer({ userId: "user-1" })

        await customerRepository.create(customer)
        await customerRepository.create(customer2)
        await customerRepository.create(customer3)

        await deleteUserCustomer.execute({
            id: customer.id,
            userId: "user-1"
        })

        expect(customerRepository.customers).toHaveLength(2)
        expect(customerRepository.customers).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ name: "maria" }) })
        ]))
    })
})