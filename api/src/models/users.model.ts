export interface User {
  readonly id: number;
  name: string;
  password: string;
  roleBits: number;
  readonly createdAt: Date;
  updatedAt: Date;
}