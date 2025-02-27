import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BancoDocument = HydratedDocument<Banco>;

@Schema({ collection: 'bancos' })
export class Banco {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  solicitud_min: number;

  @Prop({ required: false })
  solicitud_max?: number;

  @Prop({ required: false })
  periodo_min?: number;

  @Prop({ required: true })
  periodo_max: number;

  @Prop({ required: true })
  intereses_tae: number;

  @Prop({ required: true })
  url_base: string;
}

export const BancoSchema = SchemaFactory.createForClass(Banco);
