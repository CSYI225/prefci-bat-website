import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateStatDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
