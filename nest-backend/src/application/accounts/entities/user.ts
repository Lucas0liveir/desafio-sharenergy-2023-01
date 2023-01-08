import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface UserProps {
    userName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private _id: string;
    private props: UserProps;

    constructor(props: Replace<UserProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id;
    }

    public get userName(): string {
        return this.props.userName;
    }

    public set userName(userName: string) {
        this.props.userName = userName;
    }

    public get email(): string {
        return this.props.email;
    }

    public set email(email: string) {
        this.props.email = email;
    }

    public get password(): string {
        return this.props.password;
    }

    public set password(password: string) {
        this.props.password = password;
    }

    public set createdAt(createdAt: Date) {
        this.props.createdAt = createdAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt;
    }

    public get updatedAt(): Date {
        return this.props.updatedAt;
    }

}