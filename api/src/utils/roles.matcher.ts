import {Roles} from '../shared/enums';

export const hasRole = (roleBits: number, role: Roles): boolean => {
  return (roleBits & role) === role
}

export const addRole = (roleBits: number, role: Roles): number => {
  return roleBits | role
}

export const removeRole = (roleBits: number, role: Roles): number => {
  return roleBits & ~role
}
