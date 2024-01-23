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
        return ({
            transactions,
            statement: new TransactionBalance(transactions).statement
        });
    }

}
