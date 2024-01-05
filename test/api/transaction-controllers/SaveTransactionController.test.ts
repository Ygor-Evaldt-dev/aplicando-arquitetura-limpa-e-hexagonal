import axios from "axios";
import Authorization from "../../utils/Authorization";
import transactions from "../../core/transaction/data/transactions";

describe('SaveTransactionController', function () {
    let api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test.skip('should return http status 201 if new transaction created', async function () {
        const headers = await Authorization.execute();
        const response = await api.post(`/transaction/save`, transactions.new, headers);
        expect(response.status).toBe(201);
    });
});