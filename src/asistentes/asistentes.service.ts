import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './entities/asistente.entity';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
import { UpdateAsistenteDto } from './dto/update-asistente.dto';
import { Evento } from '../eventos/entities/evento.entity';

@Injectable()
export class AsistentesService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: Repository<Asistente>,

    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}


  async registrarAsistente( eventoId: number, createAsistenteDto: CreateAsistenteDto ): Promise<Asistente> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['auditorio', 'asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`No se encontró el evento con id ${eventoId}`);
    }

    if (!evento.auditorio) {
      throw new BadRequestException(
        'No se puede registrar asistentes en un evento sin auditorio asignado',
      );
    }

    const emailExistente = evento.asistentes.some(
      (a) => a.email === createAsistenteDto.email,
    );

    if (emailExistente) {
      throw new BadRequestException(
        `Ya existe un asistente registrado con el email ${createAsistenteDto.email} en este evento`,
      );
    }

    const asistentesActuales = evento.asistentes.length;
    const capacidad = evento.auditorio.capacidad;

    if (asistentesActuales >= capacidad) {
      throw new BadRequestException(
        'No se pueden registrar más asistentes, el auditorio está lleno',
      );
    }

    const asistente = this.asistenteRepository.create({
      ...createAsistenteDto,
      evento,
    });

    return this.asistenteRepository.save(asistente);
  }

  async findByEventoAsistentes(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });

    if (!evento) {
      throw new NotFoundException(`No se encontró el evento con id ${eventoId}`);
    }

    return evento.asistentes;
  }

}
