import { Router } from "express";
import { handleAttack} from "../rotes/attackRoute";

const router = Router() 

router.post('/',handleAttack)


export default router