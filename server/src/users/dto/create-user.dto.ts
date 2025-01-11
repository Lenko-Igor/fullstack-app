import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, { message: 'Password must be 6 or more symbols' })
    password: string
}
