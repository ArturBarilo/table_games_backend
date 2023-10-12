import { Model } from 'sequelize-typescript';
interface UserCreationAttrs {
    password: string;
    email: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    name: string;
    password: string;
    email: string;
    role: string;
    avatar: string;
    refreshToken: string;
    isActivated: Boolean;
    activationLink: string;
}
export {};
