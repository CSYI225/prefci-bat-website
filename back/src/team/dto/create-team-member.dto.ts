import { IsString, IsNotEmpty, IsOptional, IsInt, IsObject } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsObject()
  @IsOptional()
  socialLinks?: any;

  @IsInt()
  @IsOptional()
  order?: number;
}
