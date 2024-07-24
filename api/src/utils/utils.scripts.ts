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

export const generateJWT = async (jwtUser: JwtUserDto, expiresIn: string = '1d'): Promise<string> => {
  return jwt.sign(
    jwtUser,
    secret,
    {expiresIn: expiresIn}
  )
}