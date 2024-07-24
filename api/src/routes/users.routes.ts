import {Router} from 'express';
import {Roles} from "../shared/enums";
import {jwtAuth} from "../middleware/auth";
import {getCurrentUser, login, register, updateRole} from "../controllers/users.controller";

const router = Router()

router.post('/register', register)

router.post("/login", login)

router.get("/me", jwtAuth(Roles.USER), getCurrentUser)

router.put('/:id/role', jwtAuth(Roles.ADMIN), updateRole)


export default router;