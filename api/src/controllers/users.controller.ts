import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/users.model';
import {ERRORS_MESSAGES, Roles} from '../shared/enums';
import {sendConfirmationMail} from '../utils/mail.sender';
import {
  createUser,
  getUserByUsername,
  getUserById,
  updateRoleAndGetUser, checkUserByEmail,
} from '../services/users.service';
import {RegisterUserDto} from "../dto/register-user.dto";
import {CreateUserDto} from "../dto/create-user.dto";
import {SafeUserDto} from "../dto/safe-user.dto";
import {LoginUserDto} from "../dto/login-user.dto";
import {generateJWT, generateUUID, hashString} from "../utils/utils.scripts";
import {JwtUserDto} from "../dto/jwt-user.dto";


export const register = async (req: Request, res: Response) => {
  try {
    const userDto: RegisterUserDto = req.body

    if (await getUserByUsername(userDto.username) || await checkUserByEmail(userDto.email)) {
      return res.status(400).json({
        message: ERRORS_MESSAGES.BAD_REQUEST,
        status: 400
      })
    }

    const confirmationToken = await generateUUID();
    const hashedPassword = await hashString(userDto.password)
    const user: CreateUserDto = {
      username: userDto.username,
      email: userDto.email,
      password: hashedPassword,
      confirmationToken: confirmationToken,
    }
    const createdUser: SafeUserDto = await createUser(user)
    if (!createdUser) {
      return res.status(400).json({
        message: ERRORS_MESSAGES.BAD_REQUEST,
        status: 400
      })
    }
    // await sendConfirmationMail(createdUser.email, confirmationToken) // с await'ом, т.к. гарантируем ответ от почтового сервиса
    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const userDto: LoginUserDto = req.body
    const user: User = await getUserByUsername(userDto.username)
    if (!user || !(await bcrypt.compare(userDto.password, user.password))) {
      return res.status(401).json({
        message: ERRORS_MESSAGES.INVALID_CREDENTIALS,
        status: 401
      })
    }
    const jwtUser: JwtUserDto = {
      id: user.id,
      username: user.username,
      roleBits: user.roleBits,
    }
    const token = await generateJWT(jwtUser)

    res.locals.user = jwtUser
    res.set('Authorization', `Bearer ${token}`)
    res.status(200).json({
      username: jwtUser.username,
      token: token,
      status: 200
    })
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user: SafeUserDto = await getUserById(res.locals.user.id || null)
    if (!user) {
      return res.status(404).json({
        message: ERRORS_MESSAGES.NOT_FOUND,
        status: 404
      })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}

export const updateRole = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const role: Roles = Number(req.body.role);

  try {
    if (!(await getUserById(userId))) {
      return res.status(404).json({
        message: ERRORS_MESSAGES.NOT_FOUND,
        status: 404
      })
    }

    const jwtUser: JwtUserDto = await updateRoleAndGetUser(userId, role)
    const token = await generateJWT(jwtUser)

    res.locals.user = jwtUser
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(200).json(jwtUser)
  } catch (error) {
    res.status(500).json({
      message: ERRORS_MESSAGES.INTERNAL_SERVER_ERROR,
      status: 500
    })
  }
}