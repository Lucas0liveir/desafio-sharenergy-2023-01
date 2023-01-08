import { BadRequestException } from "@nestjs/common";

export class EmailAlreadyExists extends BadRequestException {

    constructor(message: string) {
        super(message)
    }
}