import TransactionPrismaRepository from "../../../src/external/db/TransactionPrismaRepository"
import TransactionFindById from "../../../src/core/transaction/service/TransactionFindById";
import transactions from "./data/transactions";

function makeSut() {
    const repository = new TransactionPrismaRepository();
    const usecase = new TransactionFindById(repository);
    const userId = "ad92767b-9e2b-4acf-9ae7-5327c20cd653";
    return ({
        repository,
        usecase,
        userId
    });
}

describe('TransactionFindById', function () {
    test('should return a exists transaction by id and user id', async function () {
        const { usecase, userId } = makeSut();
        const { id } = transactions.exists;
        const transaction = await usecase.execute({ id, userId });
        expect(transaction).toBeDefined();
        expect(transaction?.id.value).toEqual(id);
        expect(transaction?.userId).toEqual(userId);
    });

    test('should return null if no exists transaction', async function () {
        const { usecase, userId } = makeSut();
        const { id } = transactions.notExists;
        const transaction = await usecase.execute({ id, userId });
        expect(transaction).toBe(null);
    });
});