import { Address, AddressProps } from "@application/customers/entities/address";

type Override = Partial<AddressProps>

export function makeAddress(override: Override = {}, id?: string) {
    return new Address({
        city: "Porto Seguro",
        neighborhood: "Centro",
        number: 0,
        street: "Rua de teste",
        uf: "BA",
        ...override
    }, id)
}