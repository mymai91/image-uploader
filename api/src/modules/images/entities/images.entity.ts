import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  uploadDate: Date;

  @ManyToOne(() => User, (user) => user.images, { nullable: true })
  user: User;

  // @Column({ nullable: true })
  // userId: number;
}
