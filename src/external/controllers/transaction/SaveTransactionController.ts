import { Express, Request, Response } from "express";
import TransactionSave from "../../../core/transaction/service/TransactionSave";

export default class SaveTransactionController {
    constructor(
        private server: Express,
        private usecase: TransactionSave,
        ...middleware: any[]
    ) {
        this.server.post("/transaction/save", middleware, async (req: Request, res: Response) => {
            try {
                const newTransaction = req.body;
                await this.usecase.execute(newTransaction);
                res.status(201).send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });
    }
}