import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('ponentes')
export class Ponente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cedula: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 20 }) // interno o invitado
  tipoPonente: string;

  @Column({ length: 100 })
  especialidad: string;

  @OneToMany(() => Evento, (evento) => evento.ponente)
  eventos: Evento[];
}
