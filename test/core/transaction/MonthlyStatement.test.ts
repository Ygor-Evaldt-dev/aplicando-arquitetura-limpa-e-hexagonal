import TransactionPrismaRepository from "../../../src/external/db/TransactionPrismaRepository"
import TransactionMonthlyStatement from "../../../src/core/transaction/service/TransactionMonthlyStatement";

function makeSut() {
    const repository = new TransactionPrismaRepository();
    const usecase = new TransactionMonthlyStatement(repository);
    const userId = "ad92767b-9e2b-4acf-9ae7-5327c20cd653";
    return ({
        repository,
        usecase,
        userId
    });
}

describe('MonthlyStatement', function () {
    test('should return the exists year and month transactions and your statement', async function () {
        const { usecase, userId } = makeSut();
        const response = await usecase.execute({
            userId,
            year: 2023,
            month: 12
        });
        expect(response.transactions[0]).toBeDefined();
        expect(response.statement.total).toBeDefined();
    });

    test('should return information if no transactions found in year and month', async function () {
        const { usecase, userId } = makeSut();
        const exec = async () => await usecase.execute({
            userId,
            year: 2023,
            month: 11
        });
        expect(exec).rejects.toThrowError("Tranferências não encontradas");
    });
});