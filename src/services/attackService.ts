import bcrypt from "bcrypt";
import userDTO from "../DTO/userDTO";
import User, { IUser } from "../models/user";
import loginDTO from "../DTO/loginDTO";
import jwt from 'jsonwebtoken';
import organizations from '../data/organizations.json'
import wepones from "../models/wepones";
import attackDTO from "../DTO/attackDTO";
import actions, { IAction } from "../models/actions";
import { WeaponSpeedEnum } from "../enums/weponesSpeed";

let attackTimeout: ReturnType<typeof setTimeout> | null = null;

export const attack = async (attackDeteles: attackDTO): Promise<IAction | void> => {
    try {
        const weaponName = attackDeteles.wepone;
        const weaponSpeed = WeaponSpeedEnum[weaponName as keyof typeof WeaponSpeedEnum];

        if (weaponSpeed === undefined) {
            console.log("Weapon not found in WeaponSpeedEnum");
            return;
        }

        const wepone = await wepones.findOne({
            wepone: attackDeteles.wepone,
            userID: attackDeteles.userID
        });

        if (!wepone || wepone.amount === 0) {
            console.log("Weapon not found or amount is 0");
            return;
        }

        wepone.amount--;
        await wepone.save();

        const action = new actions({
            userID: attackDeteles.userID,
            action: `attack by ${attackDeteles.wepone}`,
            status: "launched",
            area:attackDeteles.area
        });
        await action.save();        
        attackTimeout = setTimeout(async () => {
            action.status = "hit";
            await action.save();
            console.log("'hit'");
        }, weaponSpeed * 1000);

        console.log("Attack successful");
        return action;
    } catch (error) {
        console.log("Error during attack:", error);
    }
};

export const interpeted = async (attackDeteles: attackDTO): Promise<IAction | void> => {
    try {
        const attackId = "67349f151341dd9b7c35a26c";
        const attack = await actions.findOne({});
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
        await attack.save();
        console.log("Attack intercepted successfully");
        return attack;
    } catch (error) {
        console.log("Error during interception:", error);
    }
};

export const getAttacks = async (area: string): Promise<IAction[] | void> => {
    try {
        const attacks = await actions.find({area:area});
        return attacks;
    } catch (error) {
        console.log("Error during interception:", error);
    }
};