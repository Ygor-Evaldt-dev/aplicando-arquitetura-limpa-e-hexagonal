import User from "../../core/user/model/User";
import IUserRepository from "../../core/user/service/ports/IUserRepository";

export default class UserMemoryRepository implements IUserRepository {
    constructor(
        readonly users: User[] = []
    ) { }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }
}