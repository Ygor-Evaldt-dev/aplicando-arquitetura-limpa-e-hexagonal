import dotenv from "dotenv";
dotenv.config();

import Encrypter from "../../../src/external/auth/Encrypter";
import UserPrismaRepository from "../../../src/external/db/UserPrismaRepository";
import UserLogin from "../../../src/core/user/service/UserLogin";
import JwToken from "../../../src/external/auth/JwToken";

import { LoginInput } from "../../../src/core/user/service/types/LoginInput";
import { LoginOutput } from "../../../src/core/user/service/types/LoginOutput";

import users from "./data/users";

function makeSut() {
    const repository = new UserPrismaRepository();
    const encrypter = new Encrypter();
    const jwToken = new JwToken(process.env.JWT_SECRET!);
    const userLogin = new UserLogin(repository, encrypter, jwToken);

    return ({
        repository,
        encrypter,
        jwToken,
        userLogin
    });
}

describe('User Login', function () {
    test('should return throws if no e-mail is provided', async function () {
        const { userLogin } = makeSut();
        const exec = async () => await userLogin.execute(users.noCredentials);
        expect(exec).rejects.toThrowError("Email não informado");
    });

    test('should return throws if no password is provided', async function () {
        const { userLogin } = makeSut();
        const exec = async () => await userLogin.execute(users.justWithEmail);
        expect(exec).rejects.toThrowError("Senha não informada");
    });

    test('should return an information if no user is found', async function () {
        const { userLogin } = makeSut();
        const exec = async () => await userLogin.execute(users.notRegistred);
        expect(exec).rejects.toThrowError("Usuario não cadastrado");
    });

    test('should return an information if no valid password is provided', async function () {
        const { userLogin } = makeSut();
        const data: LoginInput = {
            email: "usuarioteste@gmail.com",
            password: "invalid_password"
        }
        const exec = async () => await userLogin.execute(users.wrongPassword);
        expect(exec).rejects.toThrowError("Senha inválida");
    });

    test('should return user.password like undefined', async function () {
        const { userLogin } = makeSut();
        const response: LoginOutput = await userLogin.execute(users.validCredentials);
        expect(response.user.password).toBe(undefined);
    });

    test('should return user if valid credencials are provided', async function () {
        const { userLogin } = makeSut();
        const response: LoginOutput = await userLogin.execute(users.validCredentials);
        const { user, token } = response;

        expect(user.email.complete).toBe(users.validCredentials.email);
        expect(token).toBeDefined();
    });
})