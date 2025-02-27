import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { BancosModule } from './bancos/bancos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

const BASE_URL = process.env.MONGO_URL || 'mongo-prueba';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'admin';
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'prueba';
const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${BASE_URL}:${MONGO_PORT}`;
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(connectionString, { dbName: MONGO_DATABASE }),
    SolicitudesModule,
    BancosModule,
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
