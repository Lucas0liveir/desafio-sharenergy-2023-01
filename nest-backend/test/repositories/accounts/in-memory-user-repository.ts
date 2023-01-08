import { User } from "@application/accounts/entities/user";
import { UserRepository } from "@application/accounts/repositories/user-repository";


export class InMemoryUserRepository extends UserRepository {

    public users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user)
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }

    async findByUserName(userName: string): Promise<User> {
        return this.users.find(user => user.userName === userName)
    }

    async save(user: User): Promise<void> {
        const userIndex = this.users.findIndex(item => item.id === user.id)
        if (userIndex) {
            this.users[userIndex] = user
        }
    }

    async findRefreshToken(userId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async saveRefreshToken(userId: string, hashRefreshToken: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}