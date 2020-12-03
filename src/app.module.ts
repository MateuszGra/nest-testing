import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentsController } from './apartments/apartments.controller';

@Module({
  imports: [],
  controllers: [AppController, ApartmentsController],
  providers: [AppService],
})
export class AppModule {}
