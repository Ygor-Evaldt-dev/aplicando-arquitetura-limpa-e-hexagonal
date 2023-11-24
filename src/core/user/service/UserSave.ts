import IUseCase from "../../shared/IUseCase";
import IEncryptProvider from "./ports/IEncryptProvider";
import User from "../model/User";
import UserProps from "../model/UserProps";
import IUserRepository from "./ports/IUserRepository";

export default class UserSave implements IUseCase<UserProps, Promise<void>>{
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncryptProvider
    ) { }

    async execute(props: UserProps): Promise<void> {
        const existingUser = await this.repository.findByEmail(props.email);
        if (existingUser !== null) {
            throw new Error(`Email ${props.email} já cadastrado`);
        }

        const { password } = props;
        const propsWithEncryptPassword = Object.assign(props, { password: this.encrypter.encrypt(password) });
        const user = new User(propsWithEncryptPassword);
        await this.repository.save(user);
    }
}