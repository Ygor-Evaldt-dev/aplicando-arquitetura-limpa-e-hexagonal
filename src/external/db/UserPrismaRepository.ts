import { PrismaClient } from "@prisma/client";
import User from "../../core/user/model/User";
import IUserRepository from "../../core/user/service/ports/IUserRepository";

export default class UserPrismaRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async save(user: User): Promise<void> {
        const { id, name, email, password } = user;
        const data = {
            id: id.value,
            nome: name.complete,
            email: email.complete,
            senha: password
        }
        await this.prisma.usuario.create({ data });
    }

    async update(user: User): Promise<void> {
        const { id, name, email, password } = user;
        const data = {
            id: id.value,
            nome: name.complete,
            email: email.complete,
            senha: password
        }
        await this.prisma.usuario.update({
            where: { id: id.value },
            data
        });
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.usuario.findMany();
        return users.map(user => {
            let { id, nome, email, senha } = user;
            return new User({
                id,
                name: nome,
                email,
                password: senha
            });
        });
    }

    async findByEmail(userEmail: string): Promise<User | null> {
        const search = await this.prisma.usuario.findFirst({
            where: { email: userEmail }
        });
        if (!search) {
            return null;
        }

        const { id, nome, email, senha } = search;
        return new User({
            id,
            name: nome,
            email,
            password: senha
        });
    }

}