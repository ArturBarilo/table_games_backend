import { ApiProperty } from "@nestjs/swagger";

export class Payload {
    @ApiProperty({ example: '54' })
    userId: number;

    @ApiProperty({ example: 'some_email@gmail.com' })
    userEmail: string
}