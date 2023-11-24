import IEncryptProvider from "../../core/user/service/ports/IEncryptProvider";

export default class ReversePassword implements IEncryptProvider {
    encrypt(password: string): string {
        return password.split("").reverse().join("");
    }
    compare(password: string, encryptPassword: string): boolean {
        return this.encrypt(password) === encryptPassword;
    }
}