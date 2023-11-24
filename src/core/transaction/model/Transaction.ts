import Entity from "../../shared/Entity";
import TransactionProps from "./TransactionProps";

export default class Transaction extends Entity {
    readonly description: string;
    readonly value: number;
    readonly dueDate: Date;
    readonly userId: string;

    constructor({ id, description, value, dueDate, userId }: TransactionProps) {
        super(id!);
        this.description = description;
        this.value = value;
        this.dueDate = dueDate;
        this.userId = userId;
    }
}