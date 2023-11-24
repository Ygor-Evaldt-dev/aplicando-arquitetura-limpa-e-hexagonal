export default interface IEncryptProvider {
    encrypt(password: string): string;
    compare(password: string, encryptPassword: string): boolean;
}