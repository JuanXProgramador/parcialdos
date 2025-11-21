import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './entities/auditorio.entity';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
import { UpdateAuditorioDto } from './dto/update-auditorio.dto';

@Injectable()
export class AuditoriosService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearAuditorio(createAuditorioDto: CreateAuditorioDto): Promise<Auditorio> {
    const { capacidad } = createAuditorioDto;

    if (capacidad <= 0) {
      throw new BadRequestException(
        'La capacidad del auditorio debe ser mayor que cero',
      );
    }

    const auditorio = this.auditorioRepository.create(createAuditorioDto);
    return this.auditorioRepository.save(auditorio);
  }
  
}
