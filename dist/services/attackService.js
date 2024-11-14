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
exports.getWepones = exports.getAttacksById = exports.getAttacks = exports.intercepted = exports.attack = void 0;
const wepones_1 = __importDefault(require("../models/wepones"));
const actions_1 = __importDefault(require("../models/actions"));
const weponesSpeed_1 = require("../enums/weponesSpeed");
const missiles_json_1 = __importDefault(require("../data/missiles.json"));
const app_1 = require("../app");
let attackTimeouts = {};
const attack = (attackDeteles, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weaponName = attackDeteles.wepone;
        const weaponSpeed = weponesSpeed_1.WeaponSpeedEnum[weaponName];
        if (weaponSpeed === undefined) {
            console.log("Weapon not found in WeaponSpeedEnum");
            return;
        }
        const wepone = yield wepones_1.default.findOne({
            wepone: attackDeteles.wepone,
            userID: userId,
        });
        if (!wepone || wepone.amount === 0) {
            console.log("Weapon not found or amount is 0");
            return;
        }
        wepone.amount--;
        yield wepone.save();
        const action = new actions_1.default({
            userID: userId,
            action: attackDeteles.wepone,
            status: "launched",
            area: attackDeteles.area,
        });
        yield action.save();
        attackTimeouts[action._id.toString()] = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            action.status = "hit";
            yield action.save();
            console.log("'hit'");
        }), weaponSpeed * 1000);
        app_1.io.emit("newAttack");
        console.log("Attack successful");
        return action;
    }
    catch (error) {
        console.log("Error during attack:", error);
    }
});
exports.attack = attack;
const intercepted = (attackDeteles, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attack = yield actions_1.default.findById(attackDeteles.attackID);
        if (!attack || attack.status === "hit") {
            console.log("Attack not found or already hit");
            return;
        }
        const wepone = yield wepones_1.default.findOne({
            userID: userId,
            wepone: attackDeteles.wepone,
        });
        console.log(attackDeteles);
        if (wepone) {
            console.log(wepone);
            if (wepone.amount <= 0) {
                console.log("No weapons left to intercept");
                return;
            }
            console.log(wepone);
            wepone.amount -= 1;
            yield wepone.save();
        }
        if (attackTimeouts[attack._id.toString()]) {
            clearTimeout(attackTimeouts[attack._id.toString()]);
            attackTimeouts[attack._id.toString()] = null;
        }
        attack.status = "intercepted";
        yield attack.save();
        console.log("Attack intercepted successfully");
        app_1.io.emit("intersepted");
        return attack;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.intercepted = intercepted;
const getAttacks = (area, userid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDefenses = yield (0, exports.getWepones)(userid);
        if (!userDefenses) {
            return [];
        }
        const allAttacks = yield actions_1.default.find({ area: area });
        const filteredAttacks = [];
        const processedAttacks = allAttacks.filter((attack) => {
            return attack.status === 'hit' || attack.status === 'intercepted';
        });
        for (const attack of processedAttacks) {
            filteredAttacks.push({
                _id: attack._id,
                action: attack.action,
                area: attack.area,
                isIntersptedable: false,
                status: attack.status,
            });
        }
        for (const attack of allAttacks) {
            if (attack.status !== 'hit' && attack.status !== 'intercepted') {
                const canBeIntercepted = userDefenses.some((defense) => missiles_json_1.default.find((defenseData) => defenseData.name === defense.wepone &&
                    defenseData.intercepts.includes(attack.action)));
                filteredAttacks.push({
                    _id: attack._id,
                    action: attack.action,
                    area: attack.area,
                    isIntersptedable: canBeIntercepted,
                    status: attack.status,
                });
            }
        }
        return filteredAttacks;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.getAttacks = getAttacks;
const getAttacksById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attacks = yield actions_1.default.find({ userID: user_id });
        return attacks;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.getAttacksById = getAttacksById;
const getWepones = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weponesList = yield wepones_1.default.find({ userID: userId });
        return weponesList;
    }
    catch (error) {
        console.log("Error during interception:", error);
    }
});
exports.getWepones = getWepones;
