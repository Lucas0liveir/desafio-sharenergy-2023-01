import { makeAddress } from "@test/factories/customers/adress-factory"
import { makeCustomer } from "@test/factories/customers/customer-factory"
import { InMemoryCustomerRepository } from "@test/repositories/customers/in-memory-customer-repository"
import { EditCustomer } from "./edit-customer"
import { CustomerNotFound } from "./errors/customer-not-found"

describe("Edit customer", () => {

    it("should be able to edit a customer", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const editUserCustomer = new EditCustomer(customerRepository)

        const makedCustomer = makeCustomer({ userId: "user-1" })

        await customerRepository.create(makedCustomer)

        const newAdress = makeAddress({ neighborhood: "Copacabana", city: "Rio de Janeiro", uf: "RJ" }, makedCustomer.adress.id)

        const customerToEdit = makeCustomer({ userId: "user-1", name: "Joãozinho", adress: newAdress }, makedCustomer.id)

        await editUserCustomer.execute({
            customer: customerToEdit,
            userId: "user-1"
        })

        expect(customerRepository.customers).toEqual(expect.arrayContaining([
            expect.objectContaining({
                props: expect.objectContaining({
                    name: "Joãozinho",
                    adress: expect.objectContaining({
                        props: expect.objectContaining({
                            neighborhood: "Copacabana",
                            city: "Rio de Janeiro",
                            uf: "RJ"
                        })
                    })
                })
            })
        ]))
    })

    it("should not be able to edit a customer if nonexist", async () => {
        const customerRepository = new InMemoryCustomerRepository()
        const editUserCustomer = new EditCustomer(customerRepository)

        const newAdress = makeAddress({ neighborhood: "Copacabana", city: "Rio de Janeiro", uf: "RJ" })

        const customerToEdit = makeCustomer({ userId: "user-1", name: "Joãozinho", adress: newAdress })

        expect(async () => {
            await editUserCustomer.execute({
                customer: customerToEdit,
                userId: "user-1"
            })
        }).rejects.toThrowError(CustomerNotFound)
    })
})