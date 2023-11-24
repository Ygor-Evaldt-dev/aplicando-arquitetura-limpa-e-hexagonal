import bcrypt from "bcrypt";

import IEncryptProvider from "../../core/user/service/ports/IEncryptProvider";

export default class Encrypter implements IEncryptProvider {
    encrypt(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    compare(password: string, encryptPassword: string): boolean {
        return bcrypt.compareSync(password, encryptPassword);
    }
}