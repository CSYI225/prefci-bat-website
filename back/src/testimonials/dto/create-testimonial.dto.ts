import { IsString, IsNotEmpty, IsOptional, IsInt, Max, Min } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsInt()
  @IsOptional()
  order?: number;
}
