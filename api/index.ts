import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {initDatabase} from "./src/utils/db.init";
import BooksRoutes from "./src/routes/books.routes";
import UsersRoutes from "./src/routes/users.routes";

async function bootstrap() {
  dotenv.config()

  const app: Application = express()
  const PORT: number = Number(process.env.API_PORT) || 3000

  const options: object = {
    definition: {
      info: {
        title: "Baoobab's Books API",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/*.ts"],
  }
  const specs: object = swaggerJsDoc(options)
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