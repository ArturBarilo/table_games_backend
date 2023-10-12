import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe, Param, Res, Req, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-In.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/users/dto/craete-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { UserFreomRequest } from './dto/userFromRequest.dto'
import { Tokens } from '../token/dto/tokens.dto'
import { Payload } from 'src/token/dto/payload.dto';
import { successfulRegistration } from './dto/successfulRegistration.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'User authorization' })
    @ApiResponse({ status: 200, type: Tokens, description: 'Generate access/refresh tokens' })
    @ApiResponse({ status: 404, type: HttpException, description: 'Failed password check' })
    @Post('login')
    async signIn(@Body() signInDto: SignInDto): Promise<Tokens> {

        return this.authService.signIn(signInDto)
    }

    @ApiOperation({ summary: 'Getting user data after authorization' })
    @ApiResponse({ status: 200, type: Payload, description: 'Get user payload' })
    @ApiResponse({ status: 401, type: HttpException, description: 'Sending an incorrect or expired token' })
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req: { user: UserFreomRequest }): UserFreomRequest {

        return req.user
    }

    @ApiOperation({ summary: 'Registration new user' })
    @ApiResponse({ status: 200, type: successfulRegistration, description: 'New user was created and generate access/refresh tokens' })
    @ApiResponse({ status: 400, type: HttpException, description: 'User with this email already exists' })
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.OK)
    @Post('registration')
    async signUp(@Body() signUpDto: CreateUserDto): Promise<{ user: User, tokens: Tokens }> {

        return this.authService.signUp(signUpDto)
    }

    @ApiOperation({ summary: 'Email confirmation' })
    @ApiResponse({ status: 200, type: User, description: 'Email is confirmed' })
    @ApiResponse({ status: 400, type: HttpException, description: 'Incorrect activation link or email already confirmed' })
    @Get('activation/:activationLink')
    activate(@Param('activationLink') activationLink: string): Promise<User> {

        return this.authService.activate(activationLink)
    }
}
