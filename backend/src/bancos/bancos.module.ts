import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banco, BancoSchema } from 'src/schemas/Banco.schema';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Banco.name, schema: BancoSchema }]),
    BancosModule,
  ],
  controllers: [BancosController],
  providers: [BancosService],
  exports: [BancosService],
})
export class BancosModule {}
