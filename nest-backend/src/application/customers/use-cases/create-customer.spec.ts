import { makeAddress } from "@test/factories/customers/adress-factory"
import { InMemoryCustomerRepository } from "@test/repositories/customers/in-memory-customer-repository"
import { CreateCustomer } from "./create-customer"

describe("Create customer", () => {
    it("should be able to create a customer", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const createCustomer = new CreateCustomer(customerRepository)

        const adress = makeAddress()

        const { customer } = await createCustomer.execute({
            email: "email@teste.com",
            name: "teste",
            userId: "1",
            adressDTO: adress,
            cellPhone: "123",
            cpf: "00000000000"
        })

        expect(customerRepository.customers).toHaveLength(1)
        expect(customerRepository.customers).toEqual(expect.arrayContaining([
            expect.objectContaining({ _id: customer.id })
        ]))
    })
})