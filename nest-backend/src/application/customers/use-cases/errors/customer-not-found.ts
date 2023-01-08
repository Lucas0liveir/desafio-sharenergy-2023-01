import { BadRequestException } from "@nestjs/common";


export class CustomerNotFound extends BadRequestException {

    constructor(message: string) {
        super(message)
    }
}