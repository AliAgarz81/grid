import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contents')
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    imgPath: string;
}