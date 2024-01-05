import { Express, Request, Response } from "express";
import TransactionUpdate from "../../../core/transaction/service/TransactionUpdate";

export default class UpdateTransactionController {
    constructor(
        private server: Express,
        private usecase: TransactionUpdate,
        ...middleware: any[]
    ) {
        this.server.put("/transaction/update/:id", middleware, async (req: Request, res: Response) => {
            try {
                const params = {
                    userId: (req as any).user.id.value,
                    id: req.params.id,
                    props: req.body
                }
                await this.usecase.execute(params);
                res.status(200).send();
            } catch (error: any) {
                res.status(404).send(error.message);
            }
        });
    }
}