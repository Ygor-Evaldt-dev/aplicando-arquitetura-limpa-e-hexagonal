import IUseCase from "../../shared/IUseCase";
import IEncryptProvider from "./ports/IEncryptProvider";
import User from "../model/User";
import UserProps from "../model/UserProps";
import IUserRepository from "./ports/IUserRepository";

export default class UserUpdate implements IUseCase<UserProps, Promise<void>>{
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncryptProvider
    ) { }

    async execute(props: UserProps): Promise<void> {
        const { password } = props;
        const propsWithEncryptPassword = Object.assign(props, { password: this.encrypter.encrypt(password) });
        const user = new User(propsWithEncryptPassword);
        await this.repository.update(user);
    }
}