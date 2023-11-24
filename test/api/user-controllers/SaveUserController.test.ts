import axios from "axios";
import UserProps from "../../../src/core/user/model/UserProps";
const api = axios.create({
    baseURL: process.env.API_BASE_URL
});

describe("SaveUserController", function () {
    test('should save user if user email no existis', async function () {
        const props: UserProps = {
            name: "Perdigueiro",
            email: "perdigueiro@gmail.com",
            password: "123456"
        }
        try {
            const response = await api.post("/user/save", props);
            expect(response.status).toBe(201);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe(`Email ${props.email} já cadastrado`);
        };
    });
});