import { Module } from '@nestjs/common';
import { AuditoriosService } from './auditorios.service';
import { AuditoriosController } from './auditorios.controller';

@Module({
  controllers: [AuditoriosController],
  providers: [AuditoriosService],
})
export class AuditoriosModule {}
