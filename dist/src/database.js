"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.getDatabaseConnection = void 0;
const pg_1 = require("pg");
function getDatabaseConnection() {
    const promise = new Promise((resolve, reject) => {
        try {
            const client = new pg_1.Client();
            client.connect();
            resolve(client);
        }
        catch (error) {
            reject(error);
        }
    });
    return promise;
}
exports.getDatabaseConnection = getDatabaseConnection;
function query(databaseConnection, query) {
    const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield databaseConnection.query(query);
            yield databaseConnection.end();
            resolve(200);
        }
        catch (error) {
            reject(error);
        }
    }));
    return promise;
}
exports.query = query;
//# sourceMappingURL=database.js.map