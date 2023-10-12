import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({example: 'Petya1911', description: 'User\'s name'})
    @IsString({message: 'Should be a string'})
    @Length(3, 32, {message: 'Name length should be 3-32 characters'})
    @IsOptional()
    name: string;

    @ApiProperty({example: 'some_email@gmail.com', description: 'User\'s email adress'})
    @IsEmail({}, {message: 'Incorrect email address'})
    @IsOptional()
    email: string;
  }