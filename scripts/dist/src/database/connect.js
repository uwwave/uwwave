"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const consts_1 = require("../lib/consts");
dotenv_1.default.config();
const connectToDb = () => {
    if (mongoose_1.default.connection.readyState >= 1)
        return;
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5tyquge.mongodb.net/${consts_1.DATABSE_NAME}?retryWrites=true&w=majority`;
    return mongoose_1.default.connect(uri, {
        autoIndex: true,
    });
};
exports.connectToDb = connectToDb;
