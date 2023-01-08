import { Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user-repository";
import { EmailAlreadyExists } from "./errors/email-already-exists";
import { UserNameAlreadyExists } from "./errors/user-name-already-exists";

interface CreateUserRequest {
    userName: string;
    email: string;
    password: string;
}

@Injectable()
export class CreateUser {

    constructor(
        private userRepository: UserRepository
    ) { }

    async execute(request: CreateUserRequest): Promise<void> {
        const { email, password, userName } = request;

        const userWithEmail = await this.userRepository.findByEmail(email)

        if (userWithEmail) {
            throw new EmailAlreadyExists("Este endereço de email já foi cadastrado.")
        }

        const userWithUserName = await this.userRepository.findByUserName(userName)

        if (userWithUserName) {
            throw new UserNameAlreadyExists("Este userName já foi cadastrado.")
        }

        const user = new User({
            email,
            password: await bcrypt.hash(password, 10),
            userName
        })

        await this.userRepository.create(user)
    }
}