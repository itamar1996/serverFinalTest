"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoute_1 = require("../rotes/usersRoute");
const router = (0, express_1.Router)();
router.post('/seed', usersRoute_1.seed);
router.post('/login', usersRoute_1.login);
router.post('/register', usersRoute_1.register);
exports.default = router;
