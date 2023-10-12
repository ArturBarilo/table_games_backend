import { User } from 'src/users/users.model';
import { Tokens } from 'src/token/dto/tokens.dto'
import { ApiProperty } from '@nestjs/swagger';

export class successfulRegistration {
    @ApiProperty({})
    user: User;
    @ApiProperty({})
    tokens: Tokens

}