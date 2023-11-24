import IUseCase from "../../shared/IUseCase";
import User from "../model/User";
import IUserRepository from "./ports/IUserRepository";

export default class UserFindAll implements IUseCase<void, Promise<User[]>>{
    constructor(
        private repository: IUserRepository
    ) { }

    async execute(): Promise<User[]> {
        return await this.repository.findAll();
    }
}