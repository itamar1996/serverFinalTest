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
exports.handleGetAttacks = exports.handleDefence = exports.handleAttack = void 0;
const attackService_1 = require("../services/attackService");
const handleAttack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, attackService_1.attack)(req.body);
        res.send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleAttack = handleAttack;
const handleDefence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, attackService_1.interpeted)(req.body);
        res.send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleDefence = handleDefence;
const handleGetAttacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const area = req.params.area;
        const result = yield (0, attackService_1.getAttacks)(area);
        res.send(result);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.handleGetAttacks = handleGetAttacks;
