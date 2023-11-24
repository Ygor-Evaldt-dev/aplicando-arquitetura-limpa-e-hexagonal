import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Express } from "express";

export default class Route {
    constructor(
        private server: Express,
    ) {
        server.get("/", (req, res) => {
            res.status(200).send("Server online");
        });

        server.use(
            express.json(),
            express.urlencoded({ extended: true }),
        )

        const { PORT, ADDRESS } = process.env;
        server.listen(PORT, () => {
            console.log(`Server running on address ${ADDRESS}:${PORT}`);
        });
    }
}