import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsController } from './apartments/apartments.controller';
import { ApartmentsService } from './apartments/apartments.service';

@Module({
  imports: [],
  controllers: [AppController, ApartmentsController],
  providers: [AppService, ApartmentsService],
})
export class AppModule {}
