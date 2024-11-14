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
exports.login = exports.seed = exports.register = void 0;
const userService_1 = require("../services/userService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userService_1.registerUser)(req.body);
        res.send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const seed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userService_1.seedData)();
        res.send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.seed = seed;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, userService_1.loginUser)(req.body);
        console.log(result);
        res.status(result.code).send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
