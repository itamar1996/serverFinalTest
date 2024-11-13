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
exports.attack = void 0;
const wepones_1 = __importDefault(require("../models/wepones"));
const actions_1 = __importDefault(require("../models/actions"));
const attack = (attackDeteles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(attackDeteles.wepone);
        const wepone = yield wepones_1.default.findOne({
            wepone: attackDeteles.wepone,
            userID: attackDeteles.userID
        });
        if (!wepone) {
            console.log("wepone not found");
            return;
        }
        if (wepone.amount == 0) {
            console.log("wepone == 0");
            return;
        }
        wepone.amount--;
        yield wepone.save();
        const action = new actions_1.default({
            userID: attackDeteles.userID,
            action: `attack by ${attackDeteles.wepone}`,
            status: "launched"
        });
        yield action.save();
        console.log("attack sucses");
        return action;
    }
    catch (error) {
        console.log("eror attack", error);
        return;
    }
});
exports.attack = attack;
