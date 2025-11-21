import { Module } from '@nestjs/common';
import { PonentesService } from './ponentes.service';
import { PonentesController } from './ponentes.controller';

@Module({
  controllers: [PonentesController],
  providers: [PonentesService],
})
export class PonentesModule {}
