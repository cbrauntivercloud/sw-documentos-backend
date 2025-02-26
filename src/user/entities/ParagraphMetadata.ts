import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Paragraph } from "./Paragraph";

@Entity("paragraph_metadata")
export class ParagraphMetadata {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Paragraph, paragraph => paragraph.metadata)
    paragraph!: Paragraph;

    @Column()
    key!: string;

    @Column("jsonb")
    value!: any;

    @Column({
        type: "enum",
        enum: ["string", "number", "boolean", "date"],
        default: "string"
    })
    data_type!: "string" | "number" | "boolean" | "date";
}