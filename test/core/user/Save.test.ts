import UserPrismaRepository from "../../../src/external/db/UserPrismaRepository";
import UserProps from "../../../src/core/user/model/UserProps";
import UserSave from "../../../src/core/user/service/UserSave";
import Encrypter from "../../../src/external/auth/Encrypter";
import users from "./data/users";

function makeSut() {
    const prismaRepository = new UserPrismaRepository();
    const encrypter = new Encrypter();
    const userSave = new UserSave(prismaRepository, encrypter);
    return ({
        prismaRepository,
        encrypter,
        userSave
    });
}

describe('SaveUser usecase', function () {
    test('should return throws if user is existing', async function () {
        const { userSave } = makeSut();
        const props: UserProps = users.exists;
        const exec = async () => await userSave.execute(props);
        await expect(exec).rejects.toThrowError(`Email ${props.email} já cadastrado`);
    });

    test.skip('should create a new user', async function () {
        const { userSave } = makeSut();
        const props: UserProps = {
            name: "Usuario teste dois",
            email: "usuarioteste2@gmail.com",
            password: "12345678"
        };
        await userSave.execute(props);
    });
});