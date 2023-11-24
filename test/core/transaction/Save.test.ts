import Id from "../../../src/core/shared/object-values/Id";
import TransactionProps from "../../../src/core/transaction/model/TransactionProps";
import TransactionSave from "../../../src/core/transaction/service/TransactionSave";

function makeSut() {
    const transactionSave = new TransactionSave();
    return ({
        transactionSave
    });
}

describe('TransactionSave', function () {
    test('should create a new transaction', async function () {
        const { transactionSave } = makeSut();
        const props: TransactionProps = {
            description: "Transação de teste",
            value: 1.99,
            dueDate: new Date(),
            userId: "1"
        }

        const newTransaction = await transactionSave.execute(props);
        expect(newTransaction).toHaveProperty("id");
    });
})