import { IsString, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  titre: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  details?: string;
}
