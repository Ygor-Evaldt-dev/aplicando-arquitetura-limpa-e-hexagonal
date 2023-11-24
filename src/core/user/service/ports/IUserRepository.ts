import User from "../../model/User"

export default interface IUserRepository {
    save(user: User): Promise<void>;
    findAll(): Promise<User[]>;
    findByEmail(userEmail: string): Promise<User | null>;
    update(user: User): Promise<void>;
}