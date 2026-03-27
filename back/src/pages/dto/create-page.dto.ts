import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, { message: 'Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets' })
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;
}
