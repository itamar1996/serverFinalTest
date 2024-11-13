import { Router } from "express";
import { login, register ,seed} from "../rotes/usersRoute";

const router = Router() 
router.post('/seed',seed)

router.post('/login',login)
router.post('/register',register)


export default router