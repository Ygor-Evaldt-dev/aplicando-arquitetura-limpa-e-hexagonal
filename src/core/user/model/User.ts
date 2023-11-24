import Entity from "../../shared/Entity";
import Email from "../../shared/object-values/Email";
import SimpleName from "../../shared/object-values/SimpleName";
import UserProps from "./UserProps";

export default class User extends Entity {
    readonly name: SimpleName;
    readonly email: Email;
    readonly password: string;

    constructor({ id, name, email, password }: UserProps) {
        super(id!);
        this.name = new SimpleName(name);
        this.email = new Email(email);
        this.password = password;
    }
}