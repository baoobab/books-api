import pool from '../config/db';
import {Book} from '../models/books.model';
import {CreateBookDto} from "../dto/create-book.dto";
import {ERRORS_MESSAGES} from "../shared/enums";
import {UpdateBookDto} from "../dto/update-book.dto";
import createHttpError from "http-errors";


export const createBook = async (data: CreateBookDto) => {
  try {
    const result = await pool.query<Book>(
      'INSERT INTO books (title, author, publicationDate, genres) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.title, data.author, data.publicationDate, data.genres]
    )
    return result.rows[0]
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}

export const getAllBooks = async () => {
  try {
    const result = await pool.query<Book>(
      'SELECT * FROM books'
    )
    return result.rows
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}

export const getBookById = async (id: number) => {
  try {
    const result =
      await pool.query<Book>('SELECT * FROM books WHERE id = $1', [id])
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}

export const updateBook = async (id: number, data: UpdateBookDto) => {
  try {
    const query: string = generateUpdateQuery(id, data)
    const result = await pool.query<Book>(query)
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export const deleteBook = async (id: number) => {
  try {
    const result =
      await pool.query<Book>('DELETE FROM books WHERE id = $1 RETURNING *', [id])
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}

const generateUpdateQuery = (id: number, data: UpdateBookDto): string => {
  let query: string = "UPDATE books SET "
  let counter = 0
  for (const key in data) {
    counter++
    query += `${key} = '${data[key as keyof UpdateBookDto]}', `
  }
  query = query.slice(0, query.length - 2)
  query += ` WHERE id = ${id} RETURNING *`
  return counter == 0 ? "" : query;
}