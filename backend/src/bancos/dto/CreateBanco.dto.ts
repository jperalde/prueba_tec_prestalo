import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateBancoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsNumber()
  solicitud_min: number;
  @IsNumber()
  solicitud_max?: number;
  @IsNumber()
  periodo_min?: number;
  @IsNotEmpty()
  @IsNumber()
  periodo_max: number;
  @IsNotEmpty()
  @IsNumber()
  intereses_tae: number;
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url_base: string;
}
