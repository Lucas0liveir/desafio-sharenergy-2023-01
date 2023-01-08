import { User } from "@application/accounts/entities/user";


export class UserViewModel {

    static toHTTP(user: User) {
        return {
            id: user.id,
            userName: user.userName,
            email: user.email
        }
    }
}