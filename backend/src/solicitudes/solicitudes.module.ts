import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Solicitud, SolicitudSchema } from 'src/schemas/Solicitud.schema';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Solicitud.name, schema: SolicitudSchema },
    ]),
    SolicitudesModule,
  ],
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
  exports: [SolicitudesService],
})
export class SolicitudesModule {}
