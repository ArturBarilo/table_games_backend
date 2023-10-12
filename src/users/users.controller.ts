import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UsePipes, ValidationPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { HttpException } from '@nestjs/common';
import { AddAvatarDto } from './dto/add-avatar.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User, description: 'Get user by id' })
  @ApiResponse({ status: 404, type: HttpException, description: 'User not found by id' })
  @Get('/:id')
  getOne(
    @Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 404, type: HttpException, description: 'User not found by id' })
  @ApiResponse({ status: 200, type: String, description: 'User was deleted by id' })
  @Delete('/:id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, type: User, description: 'User was updated' })
  @ApiResponse({ status: 404, type: HttpException, description: 'User not found by id' })
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.updateUser(id, updateDto)
  }


  @ApiOperation({ summary: 'Add avatar' })
  @ApiResponse({ status: 200, type: User, description: 'Add avatar for user' })
  @ApiResponse({ status: 404, type: HttpException, description: 'User not found by id' })
  @Patch('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  addAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Body() avatarDto: AddAvatarDto,
    @UploadedFile() avatar: string
  ): Promise<User> {

    return this.usersService.addAvatar(id, avatarDto, avatar)
  }
}
