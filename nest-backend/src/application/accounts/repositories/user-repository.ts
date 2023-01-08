import { User } from "../entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findById(id: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUserName(userName: string): Promise<User | null>;
    abstract findRefreshToken(userId: string): Promise<string | null>;
    abstract saveRefreshToken(userId: string, hashRefreshToken: string): Promise<void>;
    abstract save(user: User): Promise<void>;
} 