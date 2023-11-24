export default interface ITokenProvider {
    generate(payload: string | object): string;
    validate(token: string): string | object;
}