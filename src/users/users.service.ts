import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/craete-user.dto';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddAvatarDto } from './dto/add-avatar.dto';
import { FilesService } from 'src/files/files.service';
import * as bcrypt from 'bcrypt'
import * as uuid from 'uuid';


@Injectable()
export class UsersService {

  logger: Logger;

  constructor(@InjectModel(User) private userRepository: typeof User,
    private filesService: FilesService) {
    this.logger = new Logger(UsersService.name)
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const email: string = dto.email;
    const userCheck: User = await this.userRepository.findOne({ where: { email } });

    if (userCheck) {
      this.logger.error(`user with email: ${email} already exists`)
      throw new HttpException(`user with email: ${email} already exists`, HttpStatus.BAD_REQUEST)
    }

    dto.password = await bcrypt.hash(dto.password, 5)
    dto.activationLink = uuid.v4();
    this.logger.log('create new user')
    return this.userRepository.create(dto);
  }

  async getAllUsers(): Promise<User[]> {
    this.logger.log('get all users');
    return this.userRepository.findAll();
  }

  async getOneUser(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.error(`user with id: ${id} not found`)
      throw new HttpException(`user with id: ${id} not found`, HttpStatus.NOT_FOUND)
    }
    this.logger.log(`get user by id: ${id}`)
    return user;
  }

  async getOneByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.error(`user with email: ${email} not found`)
      throw new HttpException(`user with email: ${email} not found`, HttpStatus.NOT_FOUND)
    }
    this.logger.log(`get user by email: ${email}`)
    return user;
  }

  async deleteUser(id: number): Promise<string> {
    const user: number = await this.userRepository.destroy({ where: { id } })
    if (!user) {
      this.logger.error(`user with id: ${id} not found`)
      throw new HttpException(`user with id: ${id} not found`, HttpStatus.NOT_FOUND)
    }
    this.logger.log(`user with id: ${id} was removed`)
    return `user with id: ${id} was removed`;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const userForUpdate: User = await this.userRepository.findOne({ where: { id } });
    if (!userForUpdate) {
      this.logger.error(`user with id: ${id} not found`)
      throw new HttpException(`user with id: ${id} not found`, HttpStatus.NOT_FOUND)
    }
    await this.userRepository.update(dto, { where: { id } });
    this.logger.log(`user with id: ${id} was updated`)
    return this.userRepository.findOne({ where: { id } });
  }

  async addAvatar(id: number, dto: AddAvatarDto, avatar: any): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.error(`user with id: ${id} not found`)
      throw new HttpException(`user with id: ${id} not found`, HttpStatus.NOT_FOUND)
    }

    const fileName: string = await this.filesService.createFile(avatar);
    dto.avatar = fileName;
    await this.userRepository.update(dto, { where: { id } })
    this.logger.log(`add avatar for user with id:${id}`)
    return this.userRepository.findOne({ where: { id } });
  }
}
