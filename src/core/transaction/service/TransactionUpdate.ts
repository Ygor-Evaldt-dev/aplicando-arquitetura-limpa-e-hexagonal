import IUseCase from "../../shared/IUseCase";
import Transaction from "../model/Transaction";
import TransactionProps from "../model/TransactionProps";
import ITransactionRepository from "./ports/ITransactionRepository";
import { UpdateInput } from "./types/UpdateInput";

export default class TransactionUpdate implements IUseCase<UpdateInput, Promise<void>> {
    constructor(
        private repository: ITransactionRepository
    ) { }

    async execute(params: UpdateInput): Promise<void> {
        const { userId, id, props } = params;
        const existsTransaction = await this.repository.findById(userId, id);
        if (existsTransaction === null) {
            throw new Error("Transferência não encontrada");
        }
        const transaction: Transaction = Object.assign(existsTransaction, props);
        await this.repository.update(transaction);
    }
}