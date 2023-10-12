import { ApiProperty } from '@nestjs/swagger';

export class AddAvatarDto {

  @ApiProperty({ example: 'some image', description: 'User\'s avatar' })
  avatar: string;
}