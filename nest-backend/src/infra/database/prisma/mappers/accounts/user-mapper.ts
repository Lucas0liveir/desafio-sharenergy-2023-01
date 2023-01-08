import { User } from "@application/accounts/entities/user";
import { User as RawUser } from "@prisma/client";

export class UserMapper {

    static toPrisma(user: User) {
        return {
            id: user.id,
            username: user.userName,
            email: user.email,
            password: user.password,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        }
    }

    static toDomain(rawUser: RawUser) {
        return new User({
            email: rawUser.email,
            userName: rawUser.username,
            password: rawUser.password,
            createdAt: rawUser.created_at,
            updatedAt: rawUser.created_at
        }, rawUser.id)
    }
}