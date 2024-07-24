import {Router} from 'express';
import {Roles} from "../shared/enums";
import {jwtAuth} from "../middleware/auth";
import {confirmEmail, getCurrentUser, login, register, updateRole} from "../controllers/users.controller";

const router = Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 */

/**
 * @swagger
 * /users/confirm:
 *   get:
 *     summary: Подтверждение электронной почты
 *     description: Подтверждает электронную почту пользователя по токену.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: token
 *         in: query
 *         required: true
 *         description: Токен подтверждения
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Почта успешно подтверждена
 *       '400':
 *         description: Неверный токен
 */
router.get('/confirm', confirmEmail);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Регистрирует нового пользователя.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Пользователь успешно зарегистрирован
 *       '400':
 *         description: Неверные данные
 */
router.post('/register', register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Авторизует пользователя и устанавливает JWT токен в cookies.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Успешная авторизация. Токен установлен в cookies.
 *         headers:
 *           Set-Cookie:
 *             description: JWT токен, установленный в cookies.
 *             type: string
 *             example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '401':
 *         description: Неверные учетные данные
 */
router.post('/login', login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Получение информации о текущем пользователе
 *     description: Возвращает информацию о текущем авторизованном пользователе.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Информация о пользователе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 roleBits:
 *                   type: integer
 *                   example: 7
 *       '401':
 *         description: Вы не авторизованы
 *       '403':
 *         description: Доступ запрещен
 */
router.get('/me', jwtAuth(Roles.USER), getCurrentUser);

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Обновление роли пользователя
 *     description: Обновляет роль пользователя. Доступно только для админов.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID пользователя
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: integer
 *                 example: 4
 *             required:
 *               - role
 *     responses:
 *       '200':
 *         description: Роль пользователя успешно обновлена
 *       '400':
 *         description: Неверные данные
 *       '401':
 *         description: Вы не авторизованы
 *       '403':
 *         description: Доступ запрещен
 *       '404':
 *         description: Пользователь не найден
 */
router.put('/:id/role', jwtAuth(Roles.ADMIN), updateRole);


export default router;