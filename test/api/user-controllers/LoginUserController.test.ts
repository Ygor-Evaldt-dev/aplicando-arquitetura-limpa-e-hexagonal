import axios from "axios";
import users from "../../core/user/data/users";


describe('LoginUserController', function () {
    const api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test('should return http status code 400 if no email is provided', async function () {
        try {
            await api.post("/user/login", users.noCredentials);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe('Email não informado');
        }
    });

    test('should return http status code 400 if no password is provided', async function () {
        try {
            await api.post("/user/login", users.justWithEmail);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toBe('Senha não informada');
        }
    });

    test('should return http status code 404 if user not found', async function () {
        try {
            await api.post("/user/login", users.notRegistred);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toBe('Usuario não cadastrado');
        }
    });

    test('should return http status code 401 if password is invalid', async function () {
        try {
            await api.post("/user/login", users.wrongPassword);
        } catch (error: any) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toBe('Senha inválida');
        }
    });

    test('should return http status code 200 if correct credentials are provided', async function () {
        const response = await api.post("/user/login", users.validCredentials);
        expect(response.status).toBe(200);
        expect(response.data.user.email.complete).toBe(users.validCredentials.email);
    });
});