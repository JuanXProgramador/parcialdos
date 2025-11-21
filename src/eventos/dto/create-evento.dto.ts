import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;


  @IsDateString()
  fecha: string;

  @IsInt()
  @IsPositive()
  duracionHoras: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsInt()
  ponenteId: number;

  @IsOptional()
  @IsInt()
  auditorioId?: number;
}
