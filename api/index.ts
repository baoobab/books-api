import express, {Application} from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {initDatabase} from "./src/utils/db.init";
import pool from "./src/config/db";
import {QueryResult} from "pg";
import {User} from "./src/models/users.model";

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
  };

  const specs: object = swaggerJsDoc(options)
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  app.use(express.json())

  await initDatabase()


  app
    .listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
    .on("error", (error: unknown) => {
      console.log(error)
    })
}


bootstrap();