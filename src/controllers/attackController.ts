import { Router } from "express";
import { handleAttack ,handleDefence, handleGetAttacks, handleGetAttacksById, handleGetWepones} from "../rotes/attackRoute";
import verifyAttacker from "../middllwhers/verifyAttacker";
import verifyDefence from "../middllwhers/verifyDefence";

const router = Router() 

router.post('/',verifyAttacker, handleAttack)
router.post('/defence',verifyDefence,handleDefence)
router.get('/wepones',handleGetWepones)
router.get('/attacks',handleGetAttacksById)
router.get('/:area',handleGetAttacks)


export default router