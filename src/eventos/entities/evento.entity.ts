import { Column, Entity, ManyToMany, ManyToOne, JoinTable, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ponente } from '../../ponentes/entities/ponente.entity';
import { Auditorio } from '../../auditorios/entities/auditorio.entity';
import { Asistente } from '../../asistentes/entities/asistente.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'int' })
  duracionHoras: number;

  @Column({ length: 20 })
  estado: string; // propueto, aprobado o rechazado

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, { nullable: false })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: true,
  })
  auditorio: Auditorio | null ;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];
}
