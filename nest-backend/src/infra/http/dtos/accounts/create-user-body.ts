import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {

    @ApiProperty({ example: "desafiosharenergy", description: "username do usuário." })
    @IsNotEmpty()
    @MaxLength(48)
    @IsString()
    username: string;

    @ApiProperty({ example: "desafiosharenergy@sharenergy.com", description: "email do usuário." })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Sh@r3n3rgy", description: "senha do usuário." })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(24)
    @IsString()
    password: string;
}