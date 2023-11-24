export default class Email {
    constructor(
        readonly complete: string
    ) {
        if (!this.valid(this.complete)) {
            throw new Error("Endereço de e-mail inválido");
        }
    }

    get provider(): string {
        const provider = this.complete.split("@")[1];
        return provider.split(".")[0];
    }

    private valid(email: string): boolean {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
}
