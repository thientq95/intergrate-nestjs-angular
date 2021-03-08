import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Catalog } from "./catalog.entity";
import { BaseEntity } from "./commons/base.entity";

@Entity()
export class News extends BaseEntity{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column({nullable: true})
    photoUrl: string;

    @ApiProperty()
    @Column()
    slug: string;

    @ApiProperty()
    @Column({nullable: true})
    short: string;

    @ApiProperty()
    @Column({nullable: true})
    content: string;

    @ApiProperty()
    @Column({ default: true })
    isActive: boolean;

    @ManyToOne('Catalog', 'news')
    catalog: Catalog;
}
