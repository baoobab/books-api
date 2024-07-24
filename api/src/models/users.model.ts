export interface User {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roleBits: number;
  readonly confirmationToken: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}