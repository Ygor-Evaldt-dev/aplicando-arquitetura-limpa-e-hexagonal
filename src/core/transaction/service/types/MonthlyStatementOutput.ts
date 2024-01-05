import Transaction from "../../model/Transaction"
import { BalanceOutput } from "./BalanceOutput"

export type output = {
    transactions: Transaction[],
    statement: BalanceOutput
}