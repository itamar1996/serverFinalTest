import { Router } from "express";
import { handleAttack ,handleDefence} from "../rotes/attackRoute";

const router = Router() 

router.post('/',handleAttack)
router.post('/defence',handleDefence)


export default router