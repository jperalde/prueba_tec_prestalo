import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'solicitudes' })
export class Solicitud extends Document {
  @Prop({ required: true })
  id_request: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellidos: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  cantidad: number;

  @Prop({ required: true })
  ingresos: number;

  @Prop({ required: true })
  plazos: number;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
