"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log("token", token);
        if (!token) {
            res.status(401).json({
                err: "missing token"
            });
            return;
        }
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user = payload;
        if (payload.organization.startsWith("IDF")) {
            res.status(403).json({
                err: "you not attacker"
            });
        }
        next();
    }
    catch (error) {
        res.status(401).json({
            err: "how are you"
        });
    }
};
