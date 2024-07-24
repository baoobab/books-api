import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/users.model';
import {ERRORS_MESSAGES, Roles} from "../shared/enums";
import {hasRole} from "../utils/roles.matcher";


const secret = process.env.JWT_SECRET || 'yourSecretKey';

export const jwtAuth = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: ERRORS_MESSAGES.UNAUTHORIZED,
        status: 401
      })
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: ERRORS_MESSAGES.FORBIDDEN,
          status: 403
        })
      }

      const user: User = decoded as User

      const hasRequiredRole = roles.some(role => hasRole(user.roleBits, role))

      if (roles.length > 0 && !hasRequiredRole) {
        return res.status(403).json({
          message: ERRORS_MESSAGES.FORBIDDEN,
          status: 403
        })
      }

      req.body.user = user
      next()
    })
  }
}
