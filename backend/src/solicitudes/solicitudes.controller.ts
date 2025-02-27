import mongoose from 'mongoose';
import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private solicitudesService: SolicitudesService) {}

  @Get()
  getSolicitudes() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  async getSolicitudById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Solicitud no encontrada', 404);
    const findSolicitud = await this.solicitudesService.findOne(id);
    if (!findSolicitud) throw new HttpException('Solicitud no encontrada', 404);
    return findSolicitud;
  }
}
