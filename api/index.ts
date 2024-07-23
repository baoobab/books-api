import express, {Application} from 'express';
import pool from './db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

async function bootstrap() {
  dotenv.config()

  const app: Application = express()
  const PORT: number = Number(process.env.API_PORT) || 3000

  app.use(express.json())
  const options = {
    definition: {
      info: {
        title: "Baoobab's Books API",
        version: "1.0.0",
      },
    },
    apis: ["./src/routes/*.ts"],
  };

  const specs = swaggerJsDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );


  app
    .listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
    .on("error", (err: unknown) => {
      console.log(typeof err)
      console.log(err)
    })
}


bootstrap();