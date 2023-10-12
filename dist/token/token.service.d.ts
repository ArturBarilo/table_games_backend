import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { Tokens } from './dto/tokens.dto';
export declare class TokenService {
    private userRepository;
    private jwtService;
    logger: Logger;
    constructor(userRepository: typeof User, jwtService: JwtService);
    generateTokens(userId: number, userEmail: string): Promise<Tokens>;
    saveTokens(userId: number, refreshToken: string): Promise<void>;
}
