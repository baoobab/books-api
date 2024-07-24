import bcrypt from "bcrypt";
import {v4 as uuidv4} from 'uuid';
import jwt from "jsonwebtoken";
import {JwtUserDto} from "../dto/jwt-user.dto";


const secret = process.env.JWT_SECRET || 'yourSecretKey';

export const hashString = async (str: string): Promise<string> => {
  return bcrypt.hash(str, 10);
}

export const generateUUID = async (): Promise<string> => {
  return uuidv4();
}

export const generateJWT = async (jwtUser: JwtUserDto, expiresIn: string = '10h'): Promise<string> => {
  return jwt.sign(
    jwtUser,
    secret,
    {expiresIn: expiresIn}
  )
}

export const validateUsername = (username: string) => {
  const minLength = 4;
  return username && username.length >= minLength;
}

export const validateEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}

export const validatePassword = (password: string) => {
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumbers = /\d/.test(password)

  return (
    password.length >= minLength &&
    hasLetter &&
    hasNumbers
  )
}