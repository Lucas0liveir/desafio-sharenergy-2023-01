import { Address } from "@application/customers/entities/address";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsObject, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCustomerBody {

    @ApiProperty({ example: "joão", description: "nome do cliente" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(56)
    name: string;

    @ApiProperty({ example: "joão@teste.com", description: "email do cliente" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "00000000000", description: "cpf do cliente" })
    @IsString()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    cpf: string;

    @ApiProperty({ example: "99999999999", description: "número de telefone do cliente" })
    @IsString()
    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    cellPhone: string;

    @ApiProperty({
        example: {
            city: "Porto Seguro",
            neighborhood: "Centro",
            number: 0,
            street: "Rua de teste",
            uf: "BA"
        }, description: "endereço do cliente"
    })
    @IsNotEmpty()
    @IsObject()
    adress: Address;
}