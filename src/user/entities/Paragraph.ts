import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Document } from "./Document";
import { Role } from "./Role";
import { ParagraphMetadata } from "./ParagraphMetadata";

@Entity("paragraphs")
export class Paragraph {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("text")
    content!: string;

    @Column()
    order!: number;

    @Column()
    version!: number;

    @ManyToOne(() => Document, document => document.paragraphs)
    document!: Document;

    @ManyToOne(() => Role)
    responsible_role!: Role;

    @OneToMany(() => ParagraphMetadata, metadata => metadata.paragraph)
    metadata!: ParagraphMetadata[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}