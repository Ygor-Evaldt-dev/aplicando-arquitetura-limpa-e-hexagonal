export default class SimpleName {
    constructor(
        readonly complete: string,
        readonly min: number = 3,
        readonly max: number = 150
    ) {
        if (min > max) {
            throw new Error("Tamanho mínimo não pode ser maior que o maximo");
        }
        if (!complete) {
            throw new Error("Nome é obrigatório");
        }
        if (complete.length < min) {
            throw new Error(`Nome deve ter no mínimo ${min} caracteries`);
        }
        if (complete.length > max) {
            throw new Error(`Nome deve ter no maximo ${max} caracteries`);
        }
        if (this.hasSpecialCharacters(complete)) {
            throw new Error("Nome não pode contem caracteries especais");
        }
    }

    private hasSpecialCharacters(text: string): boolean {
        const normalizeText = text.normalize("NFC").replace(/[\u0300-\u036f]/g, "");
        const regex = /[^a-zA-ZÀ-ú\s]/;
        return regex.test(normalizeText);
    }

    partial(amountCharacteries: number): string {
        return this.complete.substring(0, amountCharacteries);
    }
}