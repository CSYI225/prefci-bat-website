import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDevisDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  serviceType?: string;
}
