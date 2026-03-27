import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: any;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsInt()
  @IsNotEmpty()
  pageId: number;
}
