import axios from "axios";

import TransactionProps from "../../../src/core/transaction/model/TransactionProps";
import Authorization from "../../utils/Authorization";

describe('SaveTransactionController', function () {
    let api = axios.create({
        baseURL: process.env.API_BASE_URL
    });

    test('should return http status 201 if new transaction created', async function () {
        const props: TransactionProps = {
            description: "Transação de teste",
            value: 1.99,
            dueDate: new Date(),
            userId: "1"
        }

        console.log("process.env.API_BASE_URL", process.env.API_BASE_URL)

        const headers = await Authorization.execute();
        const response = await axios.post(`${process.env.API_BASE_URL}/transaction/save`, props, headers);
        expect(response.status).toBe(201);
    });
})