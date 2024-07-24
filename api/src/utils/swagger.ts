/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       description: model
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Уникальный идентификатор книги
 *         title:
 *           type: string
 *           example: "War and Peace"
 *           description: Название книги
 *         author:
 *           type: string
 *           example: "Leo Tolstoy"
 *           description: Автор книги
 *         genres:
 *           type: string
 *           example: "Drama, History, Love-story"
 *           description: Жанры книги
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "1867-01-01"
 *           description: Дата публикации книги
 *       required:
 *         - id
 *         - title
 *         - author
 *         - genres
 *         - publicationDate
 *
 *     User:
 *       description: model
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Уникальный идентификатор пользователя
 *         username:
 *           type: string
 *           example: "johndoe"
 *           description: Имя пользователя, минимум 4 символа
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *           description: Электронная почта пользователя
 *         password:
 *           type: string
 *           example: "password123"
 *           description: Пароль (хранится в захешированном виде), минимум 6 символов, хотя был однв буква и хотя бы одна цифра
 *         roleBits:
 *           type: integer
 *           example: 7
 *           description: Битовая маска ролей пользователя
 *         confirmationToken:
 *           type: string
 *           example: "abc123"
 *           description: Токен подтверждения электронной почты
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *           description: Дата создания пользователя
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2023-01-10T00:00:00Z"
 *           description: Дата последнего обновления пользователя
 *       required:
 *         - id
 *         - username
 *         - email
 *         - password
 *         - roleBits
 *         - confirmationToken
 *         - created_at
 *         - updated_at
 *     Roles:
 *       description: enum
 *       type: object
 *       properties:
 *         NOT_CONFIRMED_USER:
 *           type: integer
 *           example: 0
 *           description: 000 | 0
 *         USER:
 *           type: integer
 *           example: 1
 *           description: 001 | 1
 *         MANAGER:
 *           type: integer
 *           example: 2
 *           description: 010 | 2
 *         ADMIN:
 *           type: integer
 *           example: 7
 *           description: 111 | 7, так как админ покрывает все роли
 */