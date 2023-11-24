import axios from "axios";

import users from "../core/user/data/users";

const api = axios.create({
    baseURL: process.env.API_BASE_URL
});

export default class Authorization {
    static async execute() {
        const response = await api.post("/user/login", users.validCredentials);
        return ({
            headers: {
                Authorization: `Bearer ${response.data.token}`
            }
        });
    }
}