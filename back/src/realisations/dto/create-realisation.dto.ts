import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateRealisationDto {
  @IsString()
  titre: string;

  @IsString()
  @IsOptional()
  descriptionProjet?: string;

  @IsString()
  @IsOptional()
  descriptionClient?: string;

  @IsString()
  @IsOptional()
  imageAvant?: string;

  @IsString()
  @IsOptional()
  imageApres?: string;

  @IsString()
  @IsOptional()
  nomClient?: string;

  @IsInt()
  @IsOptional()
  idCategorie?: number;
}
