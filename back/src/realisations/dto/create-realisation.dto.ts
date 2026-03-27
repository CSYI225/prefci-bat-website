import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateRealisationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  client?: string;

  @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsNotEmpty()
  imgBefore: string;

  @IsString()
  @IsOptional()
  imgAfter?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsInt()
  @IsOptional()
  order?: number;
}
