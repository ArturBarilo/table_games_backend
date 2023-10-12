import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface UserCreationAttrs {
  password: string;
  email: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Petya1911', description: 'User\'s name'})
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({example: 'AW_3456NJ7', description: 'User\'s password'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({example: 'some_email@gmail.com', description: 'User\'s email adress'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example: 'unauthorized', description: 'User\'s role'})
  @Column({type: DataType.STRING, allowNull: false, defaultValue: 'unauthorized'})  
  role: string;

  @ApiProperty({example: 'some image', description: 'User\'s avatar'})
  @Column({type: DataType.STRING, allowNull: true})  
  avatar: string;

  @ApiProperty({example: 'refresh token', description: 'Refresh token'})
  @Column({type: DataType.STRING, allowNull: true})
  refreshToken: string;

  @ApiProperty({example: 'true', description: 'Сonfirmed the email or not'})
  @Column({type: DataType.BOOLEAN, defaultValue: 'false'})
  isActivated: Boolean;
  
  @ApiProperty({example: 'aQ7huwW3mMnw2oy2cVq5q', description: 'Unique part of URL to each user to confirm email'})
  @Column({type: DataType.STRING, allowNull: true})
  activationLink: string;


}
