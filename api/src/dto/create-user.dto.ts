export interface CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly confirmationToken: string;
}