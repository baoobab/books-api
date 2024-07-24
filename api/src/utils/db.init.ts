import pool from '../config/db';
import {generateUUID, hashString} from "./utils.scripts";
import {Roles} from "../shared/enums";
import {User} from "../models/users.model";

const createUsersTable = async () => {
  const query: string = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            roleBits SMALLINT DEFAULT 0,
            confirmationToken VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
  await pool.query(query)
}

const createBooksTable = async () => {
  const query: string = `
        CREATE TABLE IF NOT EXISTS books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genres VARCHAR(255) NOT NULL,    
            publicationDate DATE NOT NULL       
        );
    `
  await pool.query(query)
}

// const createAdminUser = async () => {
//   const query: string = `
//         INSERT INTO users (
//         username,
//         email,
//         password,
//         roleBits,
//         confirmationToken
//         )
//         VALUES (
//             '${process.env.ADMIN_USERNAME}',
//             '${process.env.ADMIN_EMAIL}',
//             '${await hashString(process.env.ADMIN_PASSWORD || "adminSecretPass")}',
//             ${Roles.ADMIN},
//             '${await generateUUID()}'
//         );
//     `
//   await pool.query(query)
// }

const createAdminUser = async () => {
  const username = process.env.ADMIN_USERNAME || "admin"
  const email = process.env.ADMIN_EMAIL || "admin@mail.admin"
  const password = await hashString(process.env.ADMIN_PASSWORD || "adminSecretPass")
  const roleBits = Roles.ADMIN
  const confirmationToken = await generateUUID()

  const existCheckResult = await pool.query<User>(
    'SELECT * FROM users WHERE username = $1',
    [username])
  if (existCheckResult.rows.length) return;

  const query = `
        INSERT INTO users (username, email, password, roleBits, confirmationToken)
        VALUES ($1, $2, $3, $4, $5);
    `

  const values = [username, email, password, roleBits, confirmationToken]

  await pool.query(query, values)
};



export const initDatabase = async () => {
  try {
    await createUsersTable();
    await createBooksTable();
    await createAdminUser();

    console.log('Db init was successful');
  } catch (error) {
    console.log('Error while init the db:', error);
  }
}