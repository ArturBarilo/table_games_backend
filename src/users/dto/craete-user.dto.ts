import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail, IsOptional } from 'class-validator';


export class CreateUserDto {

  @ApiProperty({example: 'AW_3456NJ7', description: 'User\'s password'})
  @IsString({message: 'Should be a string'})
  @Length(4, 16, {message: 'Password length should be 4-16 characters'})
  password: string;
  
  @ApiProperty({example: 'some_email@gmail.com', description: 'User\'s email adress'})
  @IsEmail({}, {message: 'Incorrect email address'})
  readonly email: string;

  @IsOptional()
  activationLink: string
}
