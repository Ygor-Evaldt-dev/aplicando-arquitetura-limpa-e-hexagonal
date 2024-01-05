import IUseCase from "../../shared/IUseCase";
import Transaction from "../model/Transaction";
import ITransactionRepository from "./ports/ITransactionRepository";
import { FindByIdInput } from "./types/FindByIdInput";

export default class TransactionFindById implements IUseCase<FindByIdInput, Promise<Transaction | null>>{
    constructor(
        private repository: ITransactionRepository
    ) { }

    async execute(params: FindByIdInput): Promise<Transaction | null> {
        const { userId, id } = params;
        return await this.repository.findById(userId, id);
    }
}