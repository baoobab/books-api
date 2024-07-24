export interface User {
  readonly id: number;
  username: string;
  readonly email: string;
  password: string;
  roleBits: number;
  readonly createdAt: Date;
  updatedAt: Date;
}