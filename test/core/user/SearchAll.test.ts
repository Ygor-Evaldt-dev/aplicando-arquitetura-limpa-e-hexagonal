import UserPrismaRepository from "../../../src/external/db/UserPrismaRepository";
import UserFindAll from "../../../src/core/user/service/UserFindAll";
import User from "../../../src/core/user/model/User";

function makeSut() {
    const prismaRepository = new UserPrismaRepository();
    const userFindAll = new UserFindAll(prismaRepository);
    return ({
        prismaRepository,
        userFindAll
    });
}

describe('SeachAll usecase', function () {
    test('should return all users', async function () {
        const { userFindAll } = makeSut();
        const users: User[] = await userFindAll.execute();
        expect(users.length).toBeGreaterThan(0);
    });
})