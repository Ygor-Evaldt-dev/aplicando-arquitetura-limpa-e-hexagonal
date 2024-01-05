import TransactionUpdate from "../../../src/core/transaction/service/TransactionUpdate";
import { UpdateInput } from "../../../src/core/transaction/service/types/UpdateInput";
import TransactionPrismaRepository from "../../../src/external/db/TransactionPrismaRepository";
import transactions from "./data/transactions";

function makeSut() {
    const transactionPrismaRepository = new TransactionPrismaRepository();
    const transactionUpdate = new TransactionUpdate(transactionPrismaRepository);
    const userId = "ad92767b-9e2b-4acf-9ae7-5327c20cd653";

    return ({
        transactionPrismaRepository,
        transactionUpdate,
        userId
    });
}

describe('TransactionUpdate', function () {
    test('should updated a exists transaction', async function () {
        const { transactionUpdate, userId } = makeSut();
        const props: UpdateInput = {
            userId,
            id: transactions.exists.id,
            props: {
                description: "Teste 2",
                value: 200,
            }
        }
        await transactionUpdate.execute(props);
    });

    test('there should be error information if no transaction is found', async function () {
        const { transactionUpdate, userId } = makeSut();
        const props: UpdateInput = {
            userId,
            id: transactions.notExists.id,
            props: {}
        }
        const exec = async () => await transactionUpdate.execute(props);
        expect(exec).rejects.toThrowError("Transferência não encontrada");
    });
});