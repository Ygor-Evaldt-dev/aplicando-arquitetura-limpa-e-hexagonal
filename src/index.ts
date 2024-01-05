import dotenv from "dotenv";
import express from "express";

import Route from "./external/routes/Route";
import UserPrismaRepository from "./external/db/UserPrismaRepository";

import JwToken from "./external/auth/JwToken";
import Encrypter from "./external/auth/Encrypter";

import UserSave from "./core/user/service/UserSave";
import UserLogin from "./core/user/service/UserLogin";

import SaveUserController from "./external/controllers/user/SaveUserController";
import LoginUserController from "./external/controllers/user/LoginUserController";
import TransactionSave from "./core/transaction/service/TransactionSave";
import SaveTransactionController from "./external/controllers/transaction/SaveTransactionController";
import UserMiddleware from "./external/controllers/user/middlewares/UserMiddleware";
import TransactionPrismaRepository from "./external/db/TransactionPrismaRepository";
import TransactionFindById from "./core/transaction/service/TransactionFindById";
import FindByIdTransactionController from "./external/controllers/transaction/FindByIdTransactionController";
import TransactionUpdate from "./core/transaction/service/TransactionUpdate";
import UpdateTransactionController from "./external/controllers/transaction/UpdateTransactionController";
import TransactionMonthlyStatement from "./core/transaction/service/TransactionMonthlyStatement";
import MonthlyStatementTransactionController from "./external/controllers/transaction/MonthlyStatementTransactionController";

dotenv.config();

const app = express();
new Route(app);

const userPrismaRepository = new UserPrismaRepository();
const transactionPrismaRepository = new TransactionPrismaRepository();
const encripter = new Encrypter();
const jwToken = new JwToken(process.env.JWT_SECRET!);

//  Free routes
const saveUser = new UserSave(userPrismaRepository, encripter);
new SaveUserController(app, saveUser);

const loginUser = new UserLogin(userPrismaRepository, encripter, jwToken);
new LoginUserController(app, loginUser);

// Authenticate routes
const userMiddleware = UserMiddleware.execute(userPrismaRepository, jwToken);

const saveTransaction = new TransactionSave(transactionPrismaRepository);
new SaveTransactionController(app, saveTransaction, userMiddleware);

const updateTransaction = new TransactionUpdate(transactionPrismaRepository);
new UpdateTransactionController(app, updateTransaction, userMiddleware);

const transactionFindById = new TransactionFindById(transactionPrismaRepository);
new FindByIdTransactionController(app, transactionFindById, userMiddleware);

const transactionMonthlyStatement = new TransactionMonthlyStatement(transactionPrismaRepository);
new MonthlyStatementTransactionController(app, transactionMonthlyStatement, userMiddleware);