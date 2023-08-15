import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsBoolean()
  @IsOptional()
  is_admin: boolean
}