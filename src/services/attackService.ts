import wepones, { IWepone } from "../models/wepones";
import attackDTO from "../DTO/attackDTO";
import actions, { IAction } from "../models/actions";
import { WeaponSpeedEnum } from "../enums/weponesSpeed";
import defensesData  from "../data/missiles.json";
import intersptedDTO from "../DTO/intersptedDTO";
import { io } from "../app";
let attackTimeouts: { [key: string]: NodeJS.Timeout | null } = {};

export const attack = async (attackDeteles: attackDTO, userId: string): Promise<IAction | void> => {
  try {
    const weaponName = attackDeteles.wepone;
    const weaponSpeed = WeaponSpeedEnum[weaponName as keyof typeof WeaponSpeedEnum];

    if (weaponSpeed === undefined) {
      console.log("Weapon not found in WeaponSpeedEnum");
      return;
    }

    const wepone = await wepones.findOne({
      wepone: attackDeteles.wepone,
      userID: userId,
    });

    if (!wepone || wepone.amount === 0) {
      console.log("Weapon not found or amount is 0");
      return;
    }

    wepone.amount--;
    await wepone.save();

    const action = new actions({
      userID: userId,
      action: attackDeteles.wepone,
      status: "launched",
      area: attackDeteles.area,
    });

    await action.save();

    attackTimeouts[action._id.toString()] = setTimeout(async () => {
      action.status = "hit";
      await action.save();
      console.log("'hit'");
    }, weaponSpeed * 1000);
    io.emit("newAttack");
    console.log("Attack successful");
    return action;
  } catch (error) {
    console.log("Error during attack:", error);
  }
};

export const intercepted = async (attackDeteles: intersptedDTO, userId: string): Promise<IAction | void> => {
  try {
    const attack = await actions.findById(attackDeteles.attackID);
    if (!attack || attack.status === "hit") {
      console.log("Attack not found or already hit");
      return;
    }

    const wepone = await wepones.findOne({
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
      await wepone.save();
    }

    if (attackTimeouts[attack._id.toString()]) {
      clearTimeout(attackTimeouts[attack._id.toString()]!);
      attackTimeouts[attack._id.toString()] = null;
    }

    attack.status = "intercepted";
    await attack.save();
    console.log("Attack intercepted successfully");
    io.emit("intersepted");
    return attack;
  } catch (error) {
    console.log("Error during interception:", error);
  }
};


export const getAttacks = async (area: string, userid: string): Promise<any[] | void> => {
    try {
      const userDefenses = await getWepones(userid);
      if (!userDefenses) {
        return [];
      }
  
      const allAttacks = await actions.find({ area: area });
      const filteredAttacks: any[] = [];
  
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
          const canBeIntercepted = userDefenses.some((defense: any) => 
            defensesData.find((defenseData) => 
              defenseData.name === defense.wepone && 
              defenseData.intercepts.includes(attack.action)
            )
          );
  
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
    } catch (error) {
      console.log("Error during interception:", error);
    }
  };
export const getAttacksById = async (user_id: string): Promise<IAction[] | void> => {
  try {
    const attacks = await actions.find({ userID: user_id });
    return attacks;
  } catch (error) {
    console.log("Error during interception:", error);
  }
};

export const getWepones = async (userId: string): Promise<IWepone[] | void> => {
  try {
    const weponesList = await wepones.find({ userID: userId });
    return weponesList;
  } catch (error) {
    console.log("Error during interception:", error);
  }
};
