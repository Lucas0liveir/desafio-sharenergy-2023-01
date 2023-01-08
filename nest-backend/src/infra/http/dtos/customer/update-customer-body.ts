import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { randomUUID } from "crypto";
import { CreateCustomerBody } from "./create-customer-body";

export class UpdateCustomerBody extends CreateCustomerBody {

    @ApiProperty({ example: randomUUID(), description: "id do cliente." })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id: string;

}