import IUseCase from "../../shared/IUseCase";
import Transaction from "../model/Transaction";
import TransactionProps from "../model/TransactionProps";
import ITransactionRepository from "./ports/ITransactionRepository";

export default class TransactionSave implements IUseCase<TransactionProps, Promise<void>> {
    constructor(
        private repository: ITransactionRepository
    ) { }

    async execute(props: TransactionProps): Promise<void> {
        const transaction = new Transaction(props);
        await this.repository.save(transaction);
    }
}