import { PrismaClient } from "@prisma/client";
import Transaction from "../../core/transaction/model/Transaction";
import ITransactionRepository from "../../core/transaction/service/ports/ITransactionRepository";
import { input } from "../../core/transaction/service/types/MonthlyStatementInput";

export default class TransactionPrismaRepository implements ITransactionRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(transaction: Transaction): Promise<void> {
        await this.prisma.transferencia.create({
            data: this.toTable(transaction)
        });
    }

    async update(transaction: Transaction): Promise<void> {
        await this.prisma.transferencia.update({
            where: {
                id: transaction.id.value
            },
            data: this.toTable(transaction)
        });
    }

    async findById(userId: string, id: string): Promise<Transaction | null> {
        const search = await this.prisma.transferencia.findFirst({
            where: {
                id: id,
                usuario_id: userId
            }
        });
        if (!search) return null;
        return this.fromTable(search);
    }

    async findByDueDate({ userId, year, month }: input): Promise<Transaction[]> {
        const currentMonth = new Date(year, month - 1, 1);
        const nextMonth = new Date(year, month, 1);
        const registers = await this.prisma.transferencia.findMany({
            where: {
                usuario_id: userId,
                vencimento: {
                    gte: currentMonth,
                    lt: nextMonth,
                },
            }
        });
        if (!registers[0]) return [];
        return registers.map(transaction => this.fromTable(transaction));
    }

    private toTable(transaction: Transaction) {
        const { id, description, value, dueDate, userId } = transaction;
        return ({
            id: id.value,
            descricao: description,
            valor: value,
            vencimento: dueDate,
            usuario_id: userId
        });
    }

    private fromTable(search: any) {
        const { valor, vencimento, usuario_id, descricao } = search;
        return new Transaction({
            id: search.id,
            description: descricao,
            value: valor,
            dueDate: vencimento,
            userId: usuario_id
        });
    }
}