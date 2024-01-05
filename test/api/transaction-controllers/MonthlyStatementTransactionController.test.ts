import axios from "axios";
import Authorization from "../../utils/Authorization";

describe('MonthlyStatementTransactionController', function () {
    let api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test('should return http status 200 if statement info exists', async function () {
        const headers = await Authorization.execute();
        const response = await api.get(`/transaction/statement/${2023}/${12}`, headers);
        expect(response.status).toBe(200);
    });

    test('should return http status 200 if statement info exists', async function () {
        const headers = await Authorization.execute();
        const response = await api.get(`/transaction/statement/${2022}/${12}`, headers);
        expect(response.status).toBe(200);
        expect(response.data.transactions.length).toBe(0);
        expect(response.data.statement.total).toBe(0);
    });
});