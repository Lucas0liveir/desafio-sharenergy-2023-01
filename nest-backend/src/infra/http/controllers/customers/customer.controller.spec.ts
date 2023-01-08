import { AuthService } from '@infra/http/auth/auth.service';
import { LocalAuthGuard } from '@infra/http/auth/guards/local-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/accounts/prisma-user-repository';
import { CustomerController } from './customer.controller';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { makeCustomer } from '@test/factories/customers/customer-factory';
import { FindCustomers } from '@application/customers/use-cases/find-customers';
import { CreateCustomer } from '@application/customers/use-cases/create-customer';
import { DeleteCustomer } from '@application/customers/use-cases/delete-customer';
import { EditCustomer } from '@application/customers/use-cases/edit-customer';
import { CustomerRepository } from '@application/customers/repositories/customer-repository';
import { CustomerViewModel } from '@infra/http/view-models/customers/customer-view-model';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


const customerRepositoryMock = {
    findByUserName: jest.fn(),
    create: jest.fn(),
};

describe('CustomerController', () => {
    const req = {
        user: {
            userId: "user-1"
        }
    }

    const customers = [
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" }),
        makeCustomer({ userId: "user-1" })
    ]

    let customerController: CustomerController;
    let createCustomer: CreateCustomer;
    let findCustomers: FindCustomers;
    let editCustomer: EditCustomer;
    let authGuard: JwtAuthGuard;
    let customerRepository: CustomerRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [
                { provide: CustomerRepository, useClass: PrismaUserRepository },
                JwtAuthGuard,
                FindCustomers,
                CreateCustomer,
                EditCustomer,
                DeleteCustomer,
                PrismaService
            ]
        })
            .overrideProvider(CustomerRepository)
            .useValue(customerRepositoryMock)
            .compile();

        customerController = module.get<CustomerController>(CustomerController);
        createCustomer = module.get<CreateCustomer>(CreateCustomer);
        findCustomers = module.get<FindCustomers>(FindCustomers);
        editCustomer = module.get<EditCustomer>(EditCustomer);
        authGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
        customerRepository = module.get<CustomerRepository>(CustomerRepository);
    });

    it('should be able to create a customer', async () => {

        const customer = makeCustomer({ userId: "user-1" })
        const customerToHttp = CustomerViewModel.toHTTP(customer)

        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);

        jest.spyOn(createCustomer, 'execute').mockImplementation(async () => {
            return {
                customer
            }
        })

        expect(await customerController.create(req, {
            adress: customer.adress,
            cellPhone: customer.cellPhone,
            cpf: customer.cpf,
            email: customer.email,
            name: customer.name
        })).toStrictEqual({
            customer: {
                id: customer.id,
                address: customerToHttp.address,
                cellPhone: customer.cellPhone,
                cpf: customer.cpf,
                email: customer.email,
                name: customer.name,
                userId: "user-1"
            }
        });
    });

    it('should be able to edit a customer', async () => {

        const customer = makeCustomer({ userId: "user-1" })
        const customerToHttp = CustomerViewModel.toHTTP(customer)

        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);

        jest.spyOn(editCustomer, 'execute').mockImplementation(async () => {
            return {
                customer
            }
        })

        expect(await customerController.edit(req, {
            id: customer.id,
            adress: customer.adress,
            cellPhone: customer.cellPhone,
            cpf: customer.cpf,
            email: customer.email,
            name: customer.name
        })).toStrictEqual({
            customer: {
                id: customer.id,
                address: customerToHttp.address,
                cellPhone: customer.cellPhone,
                cpf: customer.cpf,
                email: customer.email,
                name: customer.name,
                userId: "user-1"
            }
        });
    });

    it('should be able to get all customers', async () => {
        const customersToHttp = customers.map(CustomerViewModel.toHTTP)

        const name = "teste"
        const skip = 0
        const take = 10
        const hasMore = (customers.length > skip + take)
        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);

        jest.spyOn(findCustomers, 'execute').mockImplementation(async () => {
            return {
                customers,
                total: customers.length
            }
        })

        expect(await customerController.findAll(req, skip, take, name)).toStrictEqual({
            customers: customersToHttp,
            hasMore
        });
    });

    it('should be able to get page one of customers', async () => {

        const name = "teste"
        const skip = 0
        const take = 5
        const hasMore = (customers.length > skip + take)
        const customersToHttp = customers.slice(skip, skip + take).map(CustomerViewModel.toHTTP)

        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);

        jest.spyOn(findCustomers, 'execute').mockImplementation(async () => {
            return {
                customers: customers.slice(skip, skip + take),
                total: customers.length
            }
        })

        expect(await customerController.findAll(req, skip, take, name)).toStrictEqual({
            customers: customersToHttp,
            hasMore
        });
    });

    it('should be able to get last page of customers', async () => {

        const name = "teste"
        const skip = 5
        const take = 5
        const hasMore = (customers.length > skip + take)
        const customersToHttp = customers.slice(skip, skip + take).map(CustomerViewModel.toHTTP)

        jest.spyOn(authGuard, 'canActivate').mockImplementation(() => true);

        jest.spyOn(findCustomers, 'execute').mockImplementation(async () => {
            return {
                customers: customers.slice(skip, skip + take),
                total: customers.length
            }
        })

        expect(await customerController.findAll(req, skip, take, name)).toStrictEqual({
            customers: customersToHttp,
            hasMore
        });
    });
});
