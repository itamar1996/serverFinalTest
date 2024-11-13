"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attackRoute_1 = require("../rotes/attackRoute");
const router = (0, express_1.Router)();
router.post('/', attackRoute_1.handleAttack);
router.post('/defence', attackRoute_1.handleDefence);
exports.default = router;
