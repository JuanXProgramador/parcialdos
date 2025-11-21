import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('auditorios')
export class Auditorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ length: 150 })
  ubicacion: string;

  @OneToMany(() => Evento, (evento) => evento.auditorio)
  eventos: Evento[];
}
