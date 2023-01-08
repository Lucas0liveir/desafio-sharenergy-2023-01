import { CreateUser } from "@application/accounts/use-cases/create-user";
import { CreateUserBody } from "@infra/http/dtos/accounts/create-user-body";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("accounts")
export class UserController {

    constructor(
        private createUser: CreateUser
    ) { }

    @Post("create")
    async create(@Body() createUserBody: CreateUserBody) {
        const { email, password, userName } = createUserBody;

        await this.createUser.execute({
            email,
            password,
            userName
        })
    }
}
