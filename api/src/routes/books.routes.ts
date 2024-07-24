import {Router} from 'express';
import {Roles} from '../shared/enums';
import {jwtAuth} from '../middleware/auth';
import {create, getAll, getById, update, remove} from '../controllers/books.controller';

const router = Router();

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
 * /books:
 *   post:
 *     summary: Создание новой книги
 *     description: Создает новую книгу. Доступно только для админов.
 *     tags:
 *       - Books
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "War and Peace"
 *               author:
 *                 type: string
 *                 example: "Leo Tolstoy"
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1867-01-01"
 *               genres:
 *                 type: string
 *                 example: "Drama, History, Love-story"
 *             required:
 *               - title
 *               - author
 *               - publicationDate
 *               - genres
 *     responses:
 *       '201':
 *         description: Книга успешно создана
 *       '401':
 *         description: Вы не авторизованы
 *       '403':
 *         description: Доступ запрещен
 */
router.post('/', jwtAuth(Roles.ADMIN), create);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Получение всех книг
 *     description: Возвращает список всех книг.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: Список книг
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "War and Peace"
 *                   author:
 *                     type: string
 *                     example: "Leo Tolstoy"
 *                   publicationDate:
 *                     type: string
 *                     format: date
 *                     example: "1867-01-01"
 *                   genres:
 *                     type: string
 *                     example: "Fiction, History"
 */
router.get('/', getAll);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Получение книги по ID
 *     description: Возвращает книгу по указанному ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Книга найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "War and Peace"
 *                 author:
 *                   type: string
 *                   example: "Leo Tolstoy"
 *                 publicationDate:
 *                   type: string
 *                   format: date
 *                   example: "1867-02-02"
 *                 genres:
 *                   type: string
 *                   example: "Fiction, History"
 *       '404':
 *         description: Книга не найдена
 */
router.get('/:id', getById);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Обновление книги по ID
 *     description: Обновляет информацию о книге. Доступно только для админов.
 *     tags:
 *       - Books
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "1866-01-01"
 *               genres:
 *                 type: string
 *                 example: "Fiction, History, Drama"
 *     responses:
 *       '200':
 *         description: Книга успешно обновлена
 *       '401':
 *         description: Вы не авторизованы
 *       '403':
 *         description: Доступ запрещен
 *       '404':
 *         description: Книга не найдена
 */
router.put('/:id', jwtAuth(Roles.ADMIN), update);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Удаление книги по ID
 *     description: Удаляет книгу по указанному ID. Доступно только для админов.
 *     tags:
 *       - Books
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID книги
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Книга успешно удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "War and Peace"
 *                 author:
 *                   type: string
 *                   example: "Leo Tolstoy"
 *                 publicationDate:
 *                   type: string
 *                   format: date
 *                   example: "1867-02-02"
 *                 genres:
 *                   type: string
 *                   example: "Fiction, History"
 *       '401':
 *         description: Вы не авторизованы
 *       '403':
 *         description: Доступ запрещен
 *       '404':
 *         description: Книга не найдена
 */
router.delete('/:id', jwtAuth(Roles.ADMIN), remove);

export default router;
