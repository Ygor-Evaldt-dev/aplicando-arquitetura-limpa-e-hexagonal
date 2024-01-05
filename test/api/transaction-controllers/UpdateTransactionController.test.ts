import axios from "axios";
import Authorization from "../../utils/Authorization";
import transactions from "../../core/transaction/data/transactions";

describe('UpdateTransactionController', function () {
    let api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test('should return http status 200 if transaction updated', async function () {
        const headers = await Authorization.execute();
        const body = {
            description: "Teste 2",
            value: 1000,
        };
        const response = await api.put(`/transaction/update/${transactions.exists.id}`, body, headers);
        expect(response.status).toBe(200);
    });

    test('should return http status 404 if transaction does not exists for updated', async function () {
        const headers = await Authorization.execute();
        const body = {};
        try {
            await api.put(`/transaction/update/${transactions.notExists.id}`, body, headers);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toBe('Transferência não encontrada');
        }
    });
});