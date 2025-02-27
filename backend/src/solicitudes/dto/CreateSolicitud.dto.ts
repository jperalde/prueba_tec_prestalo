import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSolicitudDto {
  @IsNotEmpty()
  @IsString()
  id_request: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  ingresos: number;

  @IsNotEmpty()
  @IsNumber()
  plazos: number;
}
