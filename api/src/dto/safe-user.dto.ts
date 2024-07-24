export interface SafeUserDto {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly roleBits: number;
  // readonly createdAt: Date;
  // readonly updatedAt: Date;
}