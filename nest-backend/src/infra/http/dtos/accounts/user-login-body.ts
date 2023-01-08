import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLoginBody {

    @ApiProperty({
        description: 'O nome de usuário fornecido pelo usuário',
        type: 'string',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'A senha fornecida pelo usuário',
        type: 'string',
    })
    @IsString()
    password: string;
}