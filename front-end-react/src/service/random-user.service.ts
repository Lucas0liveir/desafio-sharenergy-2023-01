import IHttpRequest from "../adapters/httpRequest/IHttpRequest.adapter";
import { httpRequest } from "./httpRequestRandomUSer";

export interface RandomUser {
    id: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    }
    completeName: string;
    email: string;
    username: string;
    age: string
}

interface RandomUserResponse {
    name: {
        title: string;
        first: string;
        last: string;
    },
    email: string;
    dob: {
        date: string;
        age: number;
    },
    id: {
        name: string;
        value: string;
    },
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    },
    login: {
        username: string;
    }
}

class RandomUserService {

    constructor(
        private readonly httpRequest: IHttpRequest
    ) { }

    async fetchRandomUSers(page: number): Promise<RandomUser[]> {
        const { data } = await this.httpRequest.get<{ results: RandomUserResponse[] }>
            (`/?page=${page}&results=10&seed=abc&exc=gender,location,registered,phone,cell,nat&nat=br`)
        return data.results.map(randomUser => {
            return {
                id: randomUser.id.value,
                completeName: `${randomUser.name.first} ${randomUser.name.last}`,
                email: randomUser.email,
                picture: randomUser.picture,
                username: randomUser.login.username,
                age: `${randomUser.dob.age <= 1 ? randomUser.dob.age + " ano" : randomUser.dob.age + " anos"}`
            }
        })

    }
}

export const randomUserService = new RandomUserService(httpRequest)