import { IsInt, IsNotEmpty, IsPositive, IsString} from 'class-validator';

export class CreateAuditorioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsPositive()
  capacidad: number;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;
}
