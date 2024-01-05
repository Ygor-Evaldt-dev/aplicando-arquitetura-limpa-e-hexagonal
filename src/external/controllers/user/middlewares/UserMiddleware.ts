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
            const token = req.headers.authorization;
            try {
                if (!token) {
                    this.unauthorized(res);
                    return;
                }

                const userToken = tokenProvider.validate(token.split(" ")[1]) as User;
                const user = await repository.findByEmail(userToken.email.complete);
                if (!user) {
                    this.unauthorized(res);
                    return;
                }

                (req as any).user = user;
                next();
            } catch (error) {
                this.unauthorized(res);
            }
        }
    }

    private static unauthorized(res: Response): void {
        res.status(403).send(`Não autorizado`);
    }
}