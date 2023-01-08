import { Customer } from "@application/customers/entities/customer";


export class CustomerViewModel {

    static toHTTP(customer: Customer) {
        return {
            id: customer.id,
            email: customer.email,
            userId: customer.userId,
            name: customer.name,
            cpf: customer.cpf,
            cellPhone: customer.cellPhone,
            address: {
                id: customer.adress.id,
                street: customer.adress.street,
                neighborhood: customer.adress.neighborhood,
                number: customer.adress.number,
                city: customer.adress.city,
                uf: customer.adress.uf,
            }
        }
    }
}