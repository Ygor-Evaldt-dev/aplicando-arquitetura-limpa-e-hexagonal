import IUseCase from "../../shared/IUseCase";
import TransactionBalance from "./TransactionBalance";
import ITransactionRepository from "./ports/ITransactionRepository";
import { input } from "./types/MonthlyStatementInput";
import { output } from "./types/MonthlyStatementOutput";

export default class TransactionMonthlyStatement implements IUseCase<input, Promise<output>> {
    constructor(
        private repository: ITransactionRepository
    ) { }

    async execute(props: input): Promise<output> {
        const transactions = await this.repository.findByDueDate(props);
        // if (!transactions[0]) throw new Error("Tranferências não encontradas");

        return ({
            transactions,
            statement: new TransactionBalance(transactions).statement
        });
    }

}