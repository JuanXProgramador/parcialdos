import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PonentesModule } from './ponentes/ponentes.module';
import { AuditoriosModule } from './auditorios/auditorios.module';
import { AsistentesModule } from './asistentes/asistentes.module';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [PonentesModule, AuditoriosModule, AsistentesModule, EventosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
