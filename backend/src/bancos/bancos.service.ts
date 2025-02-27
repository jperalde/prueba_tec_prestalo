import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banco } from 'src/schemas/Banco.schema';
import { CreateBancoDto } from './dto/CreateBanco.dto';
import { CreateSolicitudDto } from 'src/solicitudes/dto/CreateSolicitud.dto';

@Injectable()
export class BancosService {
  constructor(@InjectModel(Banco.name) private bancoModel: Model<Banco>) {}
  async create(createBancoDto: CreateBancoDto): Promise<Banco> {
    const createdBanco = new this.bancoModel(createBancoDto);
    return createdBanco.save();
  }
  async findAll(): Promise<Banco[]> {
    return this.bancoModel.find().exec();
  }
  async findOne(id): Promise<Banco | null> {
    return this.bancoModel.findById(id).exec();
  }
  async findBestEntidadPrestamo(
    createSolicitudDto: CreateSolicitudDto,
  ): Promise<Banco[]> {
    return this.bancoModel
      .find({
        solicitud_min: { $lte: createSolicitudDto.cantidad },
        solicitud_max: { $gte: createSolicitudDto.cantidad },
        periodo_min: { $lte: createSolicitudDto.plazos },
        periodo_max: { $gte: createSolicitudDto.plazos },
      })
      .sort({ tasa_interes: 1 })
      .limit(3)
      .exec();
  }
}
