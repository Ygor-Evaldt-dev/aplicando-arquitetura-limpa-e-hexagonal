import { Express, Request, Response } from "express";
import TransactionFindById from "../../../core/transaction/service/TransactionFindById";

export default class FindByIdTransactionController {
    constructor(
        private server: Express,
        private usecase: TransactionFindById,
        ...middleware: any[]
    ) {
        this.server.get("/transaction/find/:id", middleware, async (req: Request, res: Response) => {
            try {
                const transaction = await this.usecase.execute({
                    id: req.params.id,
                    userId: (req as any).user.id.value
                });
                if (!transaction) {
                    res.status(404).send("Transferência não encontrada");
                    return;
                }
                res.status(200).json(transaction);
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });
    }
}