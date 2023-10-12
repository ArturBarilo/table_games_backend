import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-In.dto';
import { CreateUserDto } from 'src/users/dto/craete-user.dto';
import { User } from 'src/users/users.model';
import { UserFreomRequest } from './dto/userFromRequest.dto';
import { Tokens } from '../token/dto/tokens.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<Tokens>;
    getProfile(req: {
        user: UserFreomRequest;
    }): UserFreomRequest;
    signUp(signUpDto: CreateUserDto): Promise<{
        user: User;
        tokens: Tokens;
    }>;
    activate(activationLink: string): Promise<User>;
}
