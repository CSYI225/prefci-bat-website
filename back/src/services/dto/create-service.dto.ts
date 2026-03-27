import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
