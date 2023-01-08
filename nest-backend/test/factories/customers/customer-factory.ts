import { Address } from "@application/customers/entities/address";
import { Customer, CustomerProps } from "@application/customers/entities/customer";

type Override = Partial<CustomerProps>

export function makeCustomer(override: Override = {}, id?: string) {
    return new Customer({
        email: "email@teste.com",
        name: "teste",
        userId: "1",
        cellPhone: "123",
        cpf: "00000000000",
        adress: new Address({
            city: "Porto Seguro",
            neighborhood: "Centro",
            number: 0,
            street: "Rua de teste",
            uf: "BA"
        }),
        ...override
    }, id)
}