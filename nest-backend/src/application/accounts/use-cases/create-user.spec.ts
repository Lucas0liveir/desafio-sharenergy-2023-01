import { InMemoryUserRepository } from "@test/repositories/accounts/in-memory-user-repository"
import { CreateUser } from "./create-user"
import { EmailAlreadyExists } from "./errors/email-already-exists"
import { UserNameAlreadyExists } from "./errors/user-name-already-exists"

describe("create a user", () => {
    it("should be able to create a user", async () => {
        const userRepository = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepository)

        await createUser.execute({
            userName: "teste",
            email: "teste@email.com",
            password: "randompass"
        })

        expect(userRepository.users).toHaveLength(1)
        expect(userRepository.users).toEqual(expect.arrayContaining([
            expect.objectContaining({ props: expect.objectContaining({ userName: "teste" }) })
        ]))
    })

    it("should not be able to create a user if email already exists", async () => {
        const userRepository = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepository)

        await createUser.execute({
            userName: "teste",
            email: "teste@email.com",
            password: "randompass"
        })

        expect(async () => {
            await createUser.execute({
                userName: "teste2",
                email: "teste@email.com",
                password: "randompass2"
            })
        }).rejects.toThrowError(EmailAlreadyExists)
    })

    it("should not be able to create a user if user name already exists", async () => {
        const userRepository = new InMemoryUserRepository()
        const createUser = new CreateUser(userRepository)

        await createUser.execute({
            userName: "teste",
            email: "teste@email.com",
            password: "randompass"
        })

        expect(async () => {
            await createUser.execute({
                userName: "teste",
                email: "teste2@email.com",
                password: "randompass2"
            })
        }).rejects.toThrowError(UserNameAlreadyExists)
    })
})