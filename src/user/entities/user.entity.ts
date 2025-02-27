import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ unique: true })
  email!: string

  @Column()
  @Exclude()
  password!: string

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

