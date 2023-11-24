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

dotenv.config();

const app = express();
new Route(app);

const userPrismaRepository = new UserPrismaRepository();
const encripter = new Encrypter();
const jwToken = new JwToken(process.env.JWT_SECRET!);

//  Free routes
const saveUser = new UserSave(userPrismaRepository, encripter);
new SaveUserController(app, saveUser);

const loginUser = new UserLogin(userPrismaRepository, encripter, jwToken);
new LoginUserController(app, loginUser);

// Authenticate routes
const userMiddleware = UserMiddleware.execute(userPrismaRepository, jwToken);

const saveTransaction = new TransactionSave();
new SaveTransactionController(app, saveTransaction, userMiddleware);
