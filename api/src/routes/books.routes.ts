import {Router} from 'express';
import {create, getAll, getById, update, remove} from '../controllers/books.controller';
import {Roles} from "../shared/enums";
import {jwtAuth} from "../middleware/auth";

const router = Router()

router.post('/', jwtAuth([Roles.ADMIN]), create)

router.get("/", getAll)

router.get("/:id", getById)

router.put('/:id', jwtAuth([Roles.ADMIN]), update)

router.delete('/:id', jwtAuth([Roles.ADMIN]), remove)

export default router;