import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('asistentes')
export class Asistente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  codigoEstudiante: string;

  @Column({ length: 150 })
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes, {
    nullable: false,
    })
  evento: Evento;
}
