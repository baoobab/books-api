import pool from '../config/db';

const createUsersTable = async () => {
  const query: string = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            roleBits SMALLINT DEFAULT 0,
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


export const initDatabase = async () => {
  try {
    await createUsersTable();
    await createBooksTable();
    console.log('Db init was successful');
  } catch (error) {
    console.log('Error while init the db:', error);
  }
}