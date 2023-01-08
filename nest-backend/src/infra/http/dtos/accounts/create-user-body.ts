import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {

    @ApiProperty({ example: "desafiosharenergy", description: "username do usuário." })
    @IsString()
    @IsNotEmpty()
    @MaxLength(48)
    userName: string;

    @ApiProperty({ example: "desafiosharenergy@sharenergy.com", description: "email do usuário." })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Sh@r3n3rgy", description: "senha do usuário." })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(24)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;
}