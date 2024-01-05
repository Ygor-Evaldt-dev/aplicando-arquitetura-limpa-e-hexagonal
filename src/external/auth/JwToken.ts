import jwt from "jsonwebtoken";

import ITokenProvider from "../../core/user/service/ports/ITokenProvider";

export default class JwToken implements ITokenProvider {
    constructor(
        private secret: string
    ) { }

    generate(payload: string | object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1d' });
    }
    validate(token: string): string | object {
        return jwt.verify(token, this.secret);
    }
}