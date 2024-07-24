export enum Roles { // Роли, и их численные представления
  NOT_CONFIRMED_USER = 0, // 000 | 0
  USER = 1 << 0,          // 001 | 1
  MANAGER = 1 << 1,       // 010 | 2
  ADMIN = (1 << 3) - 1,   // 111 | 7, так как админ покрывает все роли
}

export enum ERRORS_MESSAGES {
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  INVALID_TOKEN = "INVALID_TOKEN",
}