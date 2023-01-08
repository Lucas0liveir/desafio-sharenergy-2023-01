import { CreateUser } from "@application/accounts/use-cases/create-user";
import { AuthModule } from "./auth/auth.module";
import { DataBaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/accounts/auth.controller";
import { UserController } from "./controllers/accounts/user.controller";
import { CreateCustomer } from "@application/customers/use-cases/create-customer";
import { FindCustomers } from "@application/customers/use-cases/find-customers";
import { DeleteCustomer } from "@application/customers/use-cases/delete-customer";
import { CustomerController } from "./controllers/customers/customer.controller";
import { EditCustomer } from "@application/customers/use-cases/edit-customer";

@Module({
    imports: [DataBaseModule, AuthModule],
    controllers: [UserController, AuthController, CustomerController],
    providers: [
        CreateUser,
        CreateCustomer,
        FindCustomers,
        EditCustomer,
        DeleteCustomer
    ]
})
export class HttpModule { }