import { v4 as uuidV4, validate } from "uuid";

export default class Id {
    constructor(
        readonly value: string = uuidV4()
    ) {
        if (!validate(value)) {
            throw new Error("Id inválido")
        }
    }
}