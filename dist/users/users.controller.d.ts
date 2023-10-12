import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { AddAvatarDto } from './dto/add-avatar.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getOne(id: number): Promise<User>;
    deleteUser(id: number): Promise<string>;
    updateUser(updateDto: UpdateUserDto, id: number): Promise<User>;
    addAvatar(id: number, avatarDto: AddAvatarDto, avatar: string): Promise<User>;
}
