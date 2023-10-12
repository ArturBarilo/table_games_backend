import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
    @ApiProperty({ example: 'Access token' })
    accessToken: string;

    @ApiProperty({ example: 'Refresh token' })
    refreshToken: string
}