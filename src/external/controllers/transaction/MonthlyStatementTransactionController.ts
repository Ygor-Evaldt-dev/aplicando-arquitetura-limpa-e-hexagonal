import { Express, Request, Response } from "express";
import TransactionMonthlyStatement from "../../../core/transaction/service/TransactionMonthlyStatement";

export default class SaveTransactionController {
    constructor(
        private server: Express,
        private usecase: TransactionMonthlyStatement,
        ...middleware: any[]
    ) {
        this.server.get("/transaction/statement/:year/:month", middleware, async (req: Request, res: Response) => {
            try {
                const { year, month } = req.params;
                const response = await this.usecase.execute({
                    userId: (req as any).user.id.value,
                    year: +year,
                    month: +month
                });
                res.status(200).json(response);
            } catch (error: any) {
                res.status(404).send(error.message);
            }
        });
    }
}