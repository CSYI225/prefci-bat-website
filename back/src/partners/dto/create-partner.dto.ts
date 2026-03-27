import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
