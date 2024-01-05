import axios from "axios";
import Authorization from "../../utils/Authorization";
import transactions from "../../core/transaction/data/transactions";

describe('SaveTransactionController', function () {
    let api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test('should return http status 200 if transaction exists', async function () {
        const headers = await Authorization.execute();
        const response = await api.get(`/transaction/find/${transactions.exists.id}`, headers);
        expect(response.status).toBe(200);
        expect(response.data.id.value).toBeDefined();
    });

    test('should return http status 404 if transaction not exists', async function () {
        const headers = await Authorization.execute();
        const exec = async () => await api.get(`/transaction/find/${transactions.notExists.id}`, headers);
        expect(exec).rejects.toMatchObject({
            response: {
                status: 404,
                data: "Transferência não encontrada"
            }
        });
    })
});