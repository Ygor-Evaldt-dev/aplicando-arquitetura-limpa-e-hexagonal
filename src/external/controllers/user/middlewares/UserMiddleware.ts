import { Request, Response, NextFunction } from "express"

import ITokenProvider from "../../../../core/user/service/ports/ITokenProvider";
import IUserRepository from "../../../../core/user/service/ports/IUserRepository";
import User from "../../../../core/user/model/User";

export default class UserMiddleware {
    static execute(
        repository: IUserRepository,
        tokenProvider: ITokenProvider
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization?.replace("Bearer", "");

            try {
                if (!token) {
                    this.unauthorized(res, "NÃO VEIO TOKEN");
                    return;
                }

                res.status(200).json(token);
                const userToken = tokenProvider.validate(token) as User;

                const user = repository.findByEmail(userToken.email.complete);

                if (!user) {
                    this.unauthorized(res, "NÃO ENCONTROU USUARIO");
                    return;
                }

                (req as any).user = user;
                next();
            } catch (error) {
                this.unauthorized(res, "Caiu no bloco catch");
            }
        }
    }

    private static unauthorized(res: Response, message?: string): void {
        res.status(403).send(`Não autorizado ${message || ""}`);
    }
}