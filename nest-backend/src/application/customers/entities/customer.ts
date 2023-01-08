import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";
import { Address } from "./address";

export interface CustomerProps {
    name: string;
    email: string;
    cpf: string;
    cellPhone: string;
    adress: Address;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Customer {
    private _id: string;
    private props: CustomerProps;

    constructor(props: Replace<CustomerProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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

    public get name(): string {
        return this.props.name;
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public get cpf(): string {
        return this.props.cpf;
    }

    public set cpf(cpf: string) {
        this.props.cpf = cpf;
    }

    public get email(): string {
        return this.props.email;
    }

    public set email(email: string) {
        this.props.email = email;
    }

    public get cellPhone(): string {
        return this.props.cellPhone;
    }

    public set cellPhone(cellPhone: string) {
        this.props.cellPhone = cellPhone;
    }

    public get adress(): Address {
        return this.props.adress;
    }

    public set adress(adress: Address) {
        this.props.adress = adress;
    }

    public get userId(): string {
        return this.props.userId;
    }

    public set userId(userId: string) {
        this.props.userId = userId;
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