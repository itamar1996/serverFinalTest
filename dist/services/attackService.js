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
exports.getAttacks = exports.interpeted = exports.attack = void 0;
const wepones_1 = __importDefault(require("../models/wepones"));
const actions_1 = __importDefault(require("../models/actions"));
const weponesSpeed_1 = require("../enums/weponesSpeed");
let attackTimeout = null;
const attack = (attackDeteles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weaponName = attackDeteles.wepone;
        const weaponSpeed = weponesSpeed_1.WeaponSpeedEnum[weaponName];
        if (weaponSpeed === undefined) {
            console.log("Weapon not found in WeaponSpeedEnum");
            return;
        }
        const wepone = yield wepones_1.default.findOne({
            wepone: attackDeteles.wepone,
            userID: attackDeteles.userID
        });
        if (!wepone || wepone.amount === 0) {
            console.log("Weapon not found or amount is 0");
            return;
        }
        wepone.amount--;
        yield wepone.save();
        const action = new actions_1.default({
            userID: attackDeteles.userID,
            action: `attack by ${attackDeteles.wepone}`,
            status: "launched",
            area: attackDeteles.area
        });
        yield action.save();
        attackTimeout = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            action.status = "hit";
            yield action.save();
            console.log("'hit'");
        }), weaponSpeed * 1000);
        console.log("Attack successful");
        return action;
    }
    catch (error) {
        console.log("Error during attack:", error);
    }
});
exports.attack = attack;
const interpeted = (attackDeteles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attackId = "67349f151341dd9b7c35a26c";
        const attack = yield actions_1.default.findOne({});
        console.log(attack);
        if (!attack || attack.status === 'hit') {
            console.log("Attack not found or already hit");
            return;
        }
        if (attackTimeout) {
            clearTimeout(attackTimeout);
            attackTimeout = null;
        }
        attack.status = "interpeted";
        yield attack.save();
        console.log("Attack intercepted successfully");
        return attack;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.interpeted = interpeted;
const getAttacks = (area) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attacks = yield actions_1.default.find({ area: area });
        return attacks;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.getAttacks = getAttacks;
