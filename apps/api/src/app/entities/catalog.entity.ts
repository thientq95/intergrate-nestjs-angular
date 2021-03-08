import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./commons/base.entity";
import { News } from "./news.entity";

@Entity()
export class Catalog extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    slug: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @OneToMany('News', 'catalog')
    news: News[];
}