import Encrypter from "../../../src/external/auth/Encrypter";
import UserPrismaRepository from "../../../src/external/db/UserPrismaRepository";
import UserUpdate from "../../../src/core/user/service/UserUpdate";
import UserProps from "../../../src/core/user/model/UserProps";
import users from "./data/users";

function makeSut() {
    const prismaRepository = new UserPrismaRepository();
    const encrypter = new Encrypter();
    const userUpdate = new UserUpdate(prismaRepository, encrypter);
    return ({
        prismaRepository,
        encrypter,
        userUpdate
    });
}
describe('UpdateUseCase', function () {
    test('should user updated', async function () {
        const { userUpdate } = makeSut();
        const props: UserProps = users.exists;
        await userUpdate.execute(props);
    });
})
