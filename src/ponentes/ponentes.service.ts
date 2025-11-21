import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './entities/ponente.entity';
import { CreatePonenteDto } from './dto/create-ponente.dto';
import { UpdatePonenteDto } from './dto/update-ponente.dto';
import { Evento } from '../eventos/entities/evento.entity';

@Injectable()
export class PonentesService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,

    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async create(createPonenteDto: CreatePonenteDto): Promise<Ponente> {
    const { tipoPonente, email } = createPonenteDto;

    if (tipoPonente === 'Interno' && !email.endsWith('.edu')) {
      throw new BadRequestException(
        'El ponente interno debe tener un correo institucional (.edu)',
      );
    }

    if (tipoPonente === 'Invitado' && !email.includes('@')) {
      throw new BadRequestException(
        'El correo del ponente invitado no es válido',
      );
    }

    const ponente = this.ponenteRepository.create(createPonenteDto);
    return this.ponenteRepository.save(ponente);
  }

  async findAll(): Promise<Ponente[]> {
    return this.ponenteRepository.find({
      relations: ['eventos'],
    });
  }

  async findOne(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepository.findOne({
      where: { id },
      relations: ['eventos'],
    });

    if (!ponente) {
      throw new NotFoundException(`No se encontró ponente con id ${id}`);
    }

    return ponente;
  }


  async remove(id: number): Promise<void> {
    const ponente = await this.findOne(id);

    const eventosAsociados = await this.eventoRepository.count({
      where: { ponente: { id: ponente.id } },
    });

    if (eventosAsociados > 0) {
      throw new BadRequestException(
        `No se puede eliminar el ponente porque tiene ${eventosAsociados} evento(s) asociado(s)`,
      );
    }

    await this.ponenteRepository.remove(ponente);
  }
}
