import {
  Controller,
  HttpException,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { SolicitudesService } from './solicitudes/solicitudes.service';
import { BancosService } from './bancos/bancos.service';
import { CreateSolicitudDto } from './solicitudes/dto/CreateSolicitud.dto';

@Controller('solicitar-prestamo')
export class AppController {
  constructor(
    private solicitudesService: SolicitudesService,
    private bancosService: BancosService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async getEntidadesPrestamo(
    @Body() createSolicitudDto: CreateSolicitudDto,
  ): Promise<string[]> {
    console.log('llego a solicitar prestamo');
    console.log(createSolicitudDto);
    console.log('llego a create');
    await this.solicitudesService.create(createSolicitudDto);
    console.log('llego a findBestEntidadPrestamo');
    const findEntidades =
      await this.bancosService.findBestEntidadPrestamo(createSolicitudDto);
    if (!findEntidades)
      throw new HttpException('No se encontraron ofertas de prestamos', 404);
    return findEntidades.map((entidad) => {
      const entidadJson = {
        name: entidad.nombre,
        approved_quantity: createSolicitudDto.cantidad,
        payment_terms: createSolicitudDto.plazos,
        taxes_percentage: entidad.intereses_tae,
        monthly_payment:
          (createSolicitudDto.cantidad * entidad.intereses_tae) /
          createSolicitudDto.plazos,
        offer_url: entidad.url_base,
      };
      return JSON.stringify(entidadJson);
    });
  }
}
