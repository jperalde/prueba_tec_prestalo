import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solicitud } from 'src/schemas/Solicitud.schema';
import { CreateSolicitudDto } from './dto/CreateSolicitud.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectModel(Solicitud.name) private SolicitudModel: Model<Solicitud>,
  ) {}
  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const createdSolicitud = new this.SolicitudModel(createSolicitudDto);
    return createdSolicitud.save();
  }
  async findAll(): Promise<Solicitud[]> {
    return this.SolicitudModel.find().exec();
  }
  async findOne(id): Promise<Solicitud | null> {
    return this.SolicitudModel.findById(id).exec();
  }
}
