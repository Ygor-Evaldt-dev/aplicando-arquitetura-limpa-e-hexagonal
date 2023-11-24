import IUseCase from "../../shared/IUseCase";
import Transaction from "../model/Transaction";
import TransactionProps from "../model/TransactionProps";

export default class TransactionSave implements IUseCase<TransactionProps, Promise<Transaction>> {
    constructor(

    ) { }

    async execute(props: TransactionProps): Promise<Transaction> {
        return new Transaction(props);
    }
}