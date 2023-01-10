import { Customer } from "@application/customers/entities/customer";
import { CreateCustomer } from "@application/customers/use-cases/create-customer";
import { DeleteCustomer } from "@application/customers/use-cases/delete-customer";
import { EditCustomer } from "@application/customers/use-cases/edit-customer";
import { FindCustomers } from "@application/customers/use-cases/find-customers";
import { JwtAuthGuard } from "@infra/http/auth/guards/jwt-auth.guard";
import { CreateCustomerBody } from "@infra/http/dtos/customer/create-customer-body";
import { UpdateCustomerBody } from "@infra/http/dtos/customer/update-customer-body";
import { CustomerViewModel } from "@infra/http/view-models/customers/customer-view-model";
import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";

@Controller("customer")
export class CustomerController {

    constructor(
        private findCustomer: FindCustomers,
        private createCustomer: CreateCustomer,
        private editCustomer: EditCustomer,
        private deleteCustomer: DeleteCustomer
    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('create')
    async create(@Req() req, @Body() createCustomerBody: CreateCustomerBody) {

        const { userId } = req.user
        const { address, cellPhone, cpf, email, name } = createCustomerBody;

        const { customer } = await this.createCustomer.execute({
            adressDTO: address,
            cellPhone,
            cpf,
            email,
            name,
            userId
        })

        return { customer: CustomerViewModel.toHTTP(customer) }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiQuery({ name: 'name', required: false })
    @Get()
    async findAll(
        @Req() req,
        @Query('skip') skip: number,
        @Query('take') take: number,
        @Query('name') name?: string
    ) {
        const { userId } = req.user

        const { customers, total } = await this.findCustomer.execute({
            userId,
            name,
            skip: Number(skip),
            take: Number(take)
        })

        return { customers: customers.map(CustomerViewModel.toHTTP), hasMore: total > skip + take }
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('edit')
    async edit(@Req() req, @Body() editCustomerBody: UpdateCustomerBody) {

        const { userId } = req.user
        const { id, address, cellPhone, cpf, email, name } = editCustomerBody;

        const { customer } = await this.editCustomer.execute({
            customer: new Customer({
                adress: address,
                cellPhone,
                cpf,
                email,
                name,
                userId
            }, id),
            userId
        })

        return { customer: CustomerViewModel.toHTTP(customer) }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete()
    async delete(@Query('id') id: string, @Req() req) {
        const { userId } = req.user

        await this.deleteCustomer.execute({
            id,
            userId
        })
    }
}