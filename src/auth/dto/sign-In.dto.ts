import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {

    @IsString({ message: 'Should be a string' })
    @Length(4, 16, { message: 'Password length should be 4-16 characters' })
    @ApiProperty({ example: 'gr45koj12', description: 'Usesr\'s password' })
    password: string;

    @IsEmail({}, { message: 'Incorrect email address' })
    @ApiProperty({ example: 'some_email@gmail.com', description: 'Usesr\'s email' })
    email: string;
}