import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";
import { Paragraph } from "./Paragraph";

@Entity("documents")
export class Document {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column({
        type: "enum",
        enum: ["draft", "in_negotiation", "approved", "signed"],
        default: "draft"
    })
    status!: "draft" | "in_negotiation" | "approved" | "signed";

    @ManyToOne(() => User)
    created_by!: User;

    @OneToMany(() => Paragraph, paragraph => paragraph.document)
    paragraphs!: Paragraph[];

    @Column({ nullable: true })
    signed_pdf_url!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}