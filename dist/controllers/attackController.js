"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attackRoute_1 = require("../rotes/attackRoute");
const verifyAttacker_1 = __importDefault(require("../middllwhers/verifyAttacker"));
const verifyDefence_1 = __importDefault(require("../middllwhers/verifyDefence"));
const router = (0, express_1.Router)();
router.post('/', verifyAttacker_1.default, attackRoute_1.handleAttack);
router.post('/defence', verifyDefence_1.default, attackRoute_1.handleDefence);
router.get('/', verifyAttacker_1.default, () => { });
router.get('/:area', attackRoute_1.handleGetAttacks);
exports.default = router;
