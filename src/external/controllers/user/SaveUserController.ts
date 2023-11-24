import UserSave from "../../../core/user/service/UserSave";
import { Express } from "express";

export default class SaveUserController {
    constructor(
        private server: Express,
        private usecase: UserSave
    ) {
        this.server.post("/user/save", async (req, res) => {
            try {
                const newUser = req.body;
                await this.usecase.execute(newUser);
                res.status(201).send();
            } catch (error: any) {
                res.status(400).send(error.message);
            }
        });
    }
}