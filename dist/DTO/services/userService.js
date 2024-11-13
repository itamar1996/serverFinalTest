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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(userDetails.password, 10);
        const user = new user_1.default({
            username: userDetails.username,
            password: hashedPassword,
            isAdmin: userDetails.isAdmin
        });
        const savedUser = yield user.save();
        return savedUser;
    }
    catch (error) {
        console.log("eror register", error);
        return;
    }
});
exports.registerUser = registerUser;
const loginUser = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ username: userDetails.username }).lean();
        if (!user) {
            throw new Error("error");
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(userDetails.password, user.password);
        if (!isPasswordMatch) {
            throw new Error("error");
        }
        const token = yield jsonwebtoken_1.default.sign({
            user_id: user.id,
            isAdmin: user.isAdmin,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "10m" });
        return Object.assign(Object.assign({}, user), { token, password: "**********" });
    }
    catch (error) {
        console.log("eror register", error);
        throw error;
    }
});
exports.loginUser = loginUser;
