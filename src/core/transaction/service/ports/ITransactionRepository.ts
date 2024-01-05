import Transaction from "../../model/Transaction";
import { input } from "../types/MonthlyStatementInput";
import { output } from "../types/MonthlyStatementOutput";

export default interface ITransactionRepository {
    save(transaction: Transaction): Promise<void>;
    update(transaction: Transaction): Promise<void>;
    findById(userId: string, id: string): Promise<Transaction | null>
    findByDueDate(props: input): Promise<Transaction[]>
}