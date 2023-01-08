import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface AddressProps {
    street: string;
    city: string;
    uf: string;
    number: number;
    neighborhood: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Address {
    private _id: string;
    private props: AddressProps;

    constructor(props: Replace<AddressProps, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
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

    public get street(): string {
        return this.props.street;
    }

    public set street(street: string) {
        this.props.street = street
    }

    public get city(): string {
        return this.props.city;
    }

    public set city(city: string) {
        this.props.city = city
    }

    public get uf(): string {
        return this.props.uf;
    }

    public set uf(uf: string) {
        this.props.uf = uf
    }

    public get neighborhood(): string {
        return this.props.neighborhood;
    }

    public set neighborhood(neighborhood: string) {
        this.props.neighborhood = neighborhood
    }

    public get number(): number {
        return this.props.number;
    }

    public set number(number: number) {
        this.props.number = number
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