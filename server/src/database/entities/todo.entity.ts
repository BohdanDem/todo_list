import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { StateEnum } from '../../common/enum/todo.enum';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: StateEnum })
  state: StateEnum;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
