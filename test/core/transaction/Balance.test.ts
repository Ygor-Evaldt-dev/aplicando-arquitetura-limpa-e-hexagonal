import Transaction from "../../../src/core/transaction/model/Transaction";
import TransactionBalance from "../../../src/core/transaction/service/TransactionBalance";
import transactions from "./data/transactions";

function makeSut() {
    const list = [
        transactions.exists,
        transactions.new,
        transactions.notExists,
    ];
    const transactionsList = list.map(item => {
        let completeItem = Object.assign(item, {
            userId: "ad92767b-9e2b-4acf-9ae7-5327c20cd653",
            dueDate: new Date(item.dueDate)
        });
        return new Transaction(completeItem);
    });

    const balance = new TransactionBalance(transactionsList);
    return ({
        balance
    });
}

describe('TransactionBalance', function () {
    test('should return transactions total ', function () {
        const { balance } = makeSut();
        const total = balance.total;
        expect(total).toBe(1900);
    });

    test('should return transactions income ', function () {
        const { balance } = makeSut();
        const income = balance.income;
        expect(income).toBe(2000);
    });

    test('should return transactions expense ', function () {
        const { balance } = makeSut();
        const expense = balance.expense;
        expect(expense).toBe(100);
    });

    test('should return transactions statement ', function () {
        const { balance } = makeSut();
        const statement = balance.statement;
        expect(statement).toHaveProperty("total");
        expect(statement).toHaveProperty("income");
        expect(statement).toHaveProperty("expense");
    });
});