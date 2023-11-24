import IUseCase from "../../shared/IUseCase";
import IEncryptProvider from "./ports/IEncryptProvider";
import ITokenProvider from "./ports/ITokenProvider";
import IUserRepository from "./ports/IUserRepository";

import { LoginInput } from "./types/LoginInput";
import { LoginOutput } from "./types/LoginOutput";

export default class UserLogin implements IUseCase<LoginInput, Promise<LoginOutput>> {
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncryptProvider,
        private tokenProvider: ITokenProvider
    ) { }

    async execute({ email, password }: LoginInput): Promise<LoginOutput> {
        if (!email) {
            throw new Error("Email não informado");
        }
        if (!password) {
            throw new Error("Senha não informada");
        }

        const user = await this.repository.findByEmail(email);
        if (user === null) {
            throw new Error("Usuario não cadastrado");
        }

        const passwordIsValid = this.encrypter.compare(password, user.password);
        if (!passwordIsValid) {
            throw new Error("Senha inválida");
        }

        const token = this.tokenProvider.generate({
            id: user.id.value,
            name: user.name,
            email: user.email
        });

        return ({
            user: Object.assign(user, { password: undefined }),
            token
        });
    }
}