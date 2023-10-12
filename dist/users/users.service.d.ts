import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/craete-user.dto';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddAvatarDto } from './dto/add-avatar.dto';
import { FilesService } from 'src/files/files.service';
export declare class UsersService {
    private userRepository;
    private filesService;
    logger: Logger;
    constructor(userRepository: typeof User, filesService: FilesService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getOneUser(id: number): Promise<User>;
    getOneByEmail(email: string): Promise<User>;
    deleteUser(id: number): Promise<string>;
    updateUser(id: number, dto: UpdateUserDto): Promise<User>;
    addAvatar(id: number, dto: AddAvatarDto, avatar: any): Promise<User>;
}
