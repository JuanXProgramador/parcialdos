import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePonenteDto {
  @IsInt()
  @IsPositive()
  cedula: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsString()
  @IsIn(['Interno', 'Invitado'])
  tipoPonente: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  especialidad: string;
}
