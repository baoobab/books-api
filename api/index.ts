import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc, {Options} from 'swagger-jsdoc';
import {initDatabase} from "./src/utils/db.init";
import BooksRoutes from "./src/routes/books.routes";
import UsersRoutes from "./src/routes/users.routes";

async function bootstrap() {
  dotenv.config()

  const app: Application = express()
  const PORT = Number(process.env.API_PORT) || 3000

  const options: Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Baoobab's Books API",
        version: "1.0.0",
      },
      tags: [
        {
          name: 'Books',
          description: 'Операции с книгами',
        },
        {
          name: 'Users',
          description: 'Операции с пользователями',
        },
      ],
    },
    apis: ["**/*.ts"],
  }

  const specs = swaggerJsDoc(options)
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  )
  await initDatabase()

  app.use(express.json())
  app.use(cookieParser())
  app.use('/books', BooksRoutes)
  app.use('/users', UsersRoutes)


  app
    .listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
    .on("error", (error: unknown) => {
      console.log(error)
    })
}


bootstrap();