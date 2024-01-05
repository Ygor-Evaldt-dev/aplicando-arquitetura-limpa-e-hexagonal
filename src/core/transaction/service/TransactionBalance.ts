import Transaction from "../model/Transaction";
import { BalanceOutput } from "./types/BalanceOutput";

export default class TransactionBalance {
    constructor(
        private transactions: Transaction[]
    ) { }

    get statement(): BalanceOutput {
        return ({
            total: this.total,
            income: this.income,
            expense: this.expense
        });
    }

    get total(): number {
        return this.transactions.reduce(this.totalizer, 0);
    }

    get income(): number {
        return this.transactions
            .filter((transaction) => transaction.value > 0)
            .reduce(this.totalizer, 0);
    }

    get expense(): number {
        const value = this.transactions
            .filter((transaction) => transaction.value < 0)
            .reduce(this.totalizer, 0);
        return Math.abs(value);
    }

    private totalizer(total: number, transaction: Transaction): number {
        return total + transaction.value;
    }
}