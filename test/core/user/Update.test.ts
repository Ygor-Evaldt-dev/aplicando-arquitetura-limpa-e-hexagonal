import Encrypter from "../../../src/external/auth/Encrypter";
import UserPrismaRepository from "../../../src/external/db/UserPrismaRepository";
import UserUpdate from "../../../src/core/user/service/UserUpdate";
import UserProps from "../../../src/core/user/model/UserProps";

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
        const props: UserProps = {
            id: '26d90d06-ae52-4bd8-9503-5b9b9b9551d3',
            name: "Usuario Teste",
            email: "usuarioteste@gmail.com",
            password: "12345678"
        };
        await userUpdate.execute(props);
    });
})
