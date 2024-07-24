import pool from '../config/db';
import {User} from '../models/users.model';
import {CreateUserDto} from "../dto/create-user.dto";
import {ERRORS_MESSAGES, Roles} from "../shared/enums";
import createHttpError from "http-errors";
import {QueryResult} from "pg";
import {SafeUserDto} from "../dto/safe-user.dto";
import {JwtUserDto} from "../dto/jwt-user.dto";
import {resolveObjectURL} from "buffer";
import {generateUUID} from "../utils/utils.scripts";


export const createUser = async (user: CreateUserDto) => {
  try {
    const result: QueryResult<SafeUserDto> = await pool.query<User>(
      `INSERT INTO users (username, email, password, roleBits, confirmationToken)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, roleBits AS "roleBits"`,
      [user.username, user.email, user.password, Roles.NOT_CONFIRMED_USER, user.confirmationToken]
    )
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export const checkUserByEmail = async (email: string) => {
  try {
    const result = await pool.query<User>(
      'SELECT id FROM users WHERE email = $1',
      [email])
    return !!result.rows.length;
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const result = await pool.query<User>(
      'SELECT id, username, email, password, ' +
      'roleBits AS "roleBits", confirmationToken AS "confirmationToken" ' +
      'FROM users WHERE username = $1',
      [username])
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export const getUserById = async (id: number) => {
  try {
    const result: QueryResult<SafeUserDto> = await pool.query<User>(
      'SELECT id, username, email, roleBits AS "roleBits" FROM users WHERE id = $1',
      [id]);
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

export const updateRoleAndGetUser = async (id: number, role: number) => {
  try {
    const result: QueryResult<JwtUserDto> = await pool.query<User>(
      'UPDATE users SET roleBits = $1 WHERE id = $2 ' +
      'RETURNING id, username, roleBits AS "roleBits"',
      [role, id])
    return result.rows[0] || null
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}

const refreshConfirmationToken = async (id: number) => {
  if (!id) return false;

  try {
    await pool.query<User>(
      'UPDATE users SET confirmationToken = $1 WHERE id = $2',
      [await generateUUID(), id])
    return true;
  } catch (error) {
    console.log('Error while refreshing token:', error)
    return false;
  }
}

export const confirmEmailByToken = async (token: string) => {
  try {
    const result = await pool.query<User>(
      'UPDATE users SET roleBits = $1 WHERE confirmationToken = $2 RETURNING id',
      [Roles.USER, token])
    refreshConfirmationToken(result.rows[0]?.id)

    return !!result.rows.length;
  } catch (error) {
    throw createHttpError(500, ERRORS_MESSAGES.INTERNAL_SERVER_ERROR)
  }
}
