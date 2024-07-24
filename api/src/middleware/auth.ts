import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {ERRORS_MESSAGES, Roles} from '../shared/enums';
import {JwtUserDto} from '../dto/jwt-user.dto';
import {hasRole} from '../utils/roles.matcher';

const secret = process.env.JWT_SECRET || 'your_secret_key';

export const jwtAuth = (role: Roles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: ERRORS_MESSAGES.UNAUTHORIZED,
        status: 401
      })
    }

    try {
      const jwtUser: JwtUserDto = jwt.verify(token, secret) as JwtUserDto
      if (!hasRole(jwtUser.roleBits, role)) {
        return res.status(403).json({
          message: ERRORS_MESSAGES.FORBIDDEN,
          status: 403
        })
      }

      res.locals.user = jwtUser
      next()
    } catch {
      return res.status(403).json({
        message: ERRORS_MESSAGES.FORBIDDEN,
        status: 403
      })
    }
  }
}
