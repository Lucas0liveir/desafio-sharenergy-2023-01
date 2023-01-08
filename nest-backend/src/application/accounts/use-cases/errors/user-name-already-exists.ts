import { BadRequestException } from "@nestjs/common";

export class UserNameAlreadyExists extends BadRequestException {

    constructor(message: string) {
        super(message)
    }
}