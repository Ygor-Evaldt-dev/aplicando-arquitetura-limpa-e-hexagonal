import TransactionSave from "../../../src/core/transaction/service/TransactionSave";
import TransactionPrismaRepository from "../../../src/external/db/TransactionPrismaRepository";
import transactions from "./data/transactions";

function makeSut() {
    const transactionPrismaRepository = new TransactionPrismaRepository();
    const transactionSave = new TransactionSave(transactionPrismaRepository);
    const userId = "ad92767b-9e2b-4acf-9ae7-5327c20cd653";

    return ({
        transactionPrismaRepository,
        transactionSave,
        userId
    });
}

describe('TransactionSave', function () {
    test.skip('should create a new transaction', async function () {
        const { transactionSave, userId } = makeSut();
        const props = Object.assign(transactions.new, {
            userId,
            dueDate: new Date(transactions.new.dueDate)
        })
        await transactionSave.execute(props);
    });
});