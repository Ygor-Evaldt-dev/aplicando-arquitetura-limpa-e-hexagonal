import User from "../../model/User"

export type LoginOutput = {
    user: User,
    token: string
}