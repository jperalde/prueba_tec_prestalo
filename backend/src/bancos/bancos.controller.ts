import mongoose from 'mongoose';
import { Controller, Get, Param, HttpException } from '@nestjs/common';
import { BancosService } from './bancos.service';

@Controller('bancos')
export class BancosController {
  constructor(private BancosService: BancosService) {}

  @Get()
  getBancos() {
    return this.BancosService.findAll();
  }

  @Get(':id')
  async getBancoById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Banco no encontrado', 404);
    const findBanco = await this.BancosService.findOne(id);
    if (!findBanco) throw new HttpException('Banco no encontrado', 404);
    return findBanco;
  }
}
