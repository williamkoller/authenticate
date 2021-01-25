import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @PrimaryColumn()
  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Index({ unique: true })
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
