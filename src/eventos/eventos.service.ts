import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Ponente } from '../ponentes/entities/ponente.entity';
import { Auditorio } from '../auditorios/entities/auditorio.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,

    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,

    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const { duracionHoras, ponenteId, auditorioId, descripcion } =
      createEventoDto as any;

    if (duracionHoras <= 0) { 
      throw new BadRequestException( 'La duración del evento debe ser mayor que cero');
    }

    const ponente = await this.ponenteRepository.findOne({
      where: { id: ponenteId },
    });

    if (!ponente) {
      throw new NotFoundException(`No se encontró el ponente con id ${ponenteId}`);
    }

    if (
      ponente.tipoPonente === 'Invitado' && (!descripcion || descripcion.length < 50)
    ) {
      throw new BadRequestException('La descripción del evento con ponente invitado debe tener al menos 50 caracteres');
    }

    let auditorio: Auditorio | null = null;
    if (auditorioId) {
      auditorio = await this.auditorioRepository.findOne({
        where: { id: auditorioId },
      });
      if (!auditorio) {
        throw new NotFoundException(
          `No se encontró el auditorio con id ${auditorioId}`,
        );
      }
    }

    const evento = this.eventoRepository.create({
      ...createEventoDto,
      ponente,
      auditorio: auditorio,
      estado: 'Propuesto',
    });

    return this.eventoRepository.save(evento);
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find({
      relations: ['ponente', 'auditorio', 'asistentes'],
    });
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`No se encontró evento con id ${id}`);
    }

    return evento;
  }
  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.findOne(id);

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede aprobar un evento sin auditorio asignado',
      );
    }

    evento.estado = 'Aprobado';
    return this.eventoRepository.save(evento);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);

    if (evento.estado === 'Aprobado') {
      throw new BadRequestException(
        'No se puede eliminar un evento que ya está aprobado',
      );
    }

    await this.eventoRepository.remove(evento);
  }
}
