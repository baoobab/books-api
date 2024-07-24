export interface JwtUserDto {
  readonly id: number;
  readonly username: string;
  readonly roleBits: number;
}