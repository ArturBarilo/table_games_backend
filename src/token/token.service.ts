import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Tokens } from './dto/tokens.dto'; 
import { Payload } from './dto/payload.dto'; 


@Injectable()
export class TokenService {

    logger: Logger

    constructor(@InjectModel(User) private userRepository: typeof User,
        private jwtService: JwtService
    ) { 
        this.logger = new Logger(TokenService.name)
    }

    async generateTokens(userId: number, userEmail: string): Promise<Tokens> {
        const payload: Payload = { userId, userEmail }

        const accessToken: string = await this.jwtService.signAsync(payload, { secret: jwtConstants.secretAccess, expiresIn: '30m' })
        const refreshToken: string = await this.jwtService.signAsync(payload, { secret: jwtConstants.secretRefresh, expiresIn: '10d' })
        this.logger.log('generate access/refresh tokens')
        this.saveTokens(userId, refreshToken)
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokens(userId: number, refreshToken: string): Promise<void> {
        const user: User = await this.userRepository.findOne({where:{id: userId}})
        user.refreshToken = refreshToken
        
        this.logger.log('save refresh token')
        await user.save()
    }
}
