import { Express } from "express";

import UserLogin from "../../../core/user/service/UserLogin";

export default class LoginUserController {
    constructor(
        private server: Express,
        private usecase: UserLogin
    ) {
        this.server.post("/user/login", async (req, res) => {
            try {
                const credencials = req.body;
                const response = await this.usecase.execute(credencials);
                res.status(200).json(response);
            } catch (error: any) {
                const { message } = error;

                const notFound: boolean = message === "Usuario não cadastrado";
                if (notFound) {
                    res.status(404).send(message);
                    return;
                }

                const unauthorized: boolean = message === "Senha inválida";
                if (unauthorized) {
                    res.status(401).send(message);
                    return;
                }

                const badRequest: boolean = message === "Email não informado" || message === "Senha não informada";
                if (badRequest) {
                    res.status(400).send(message);
                    return;
                }

                res.status(500).send("Erro interno inesperado");
            }
        });
    }
}