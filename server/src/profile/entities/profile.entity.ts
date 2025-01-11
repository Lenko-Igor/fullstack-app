import { Column, Entity, OneToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

import { User } from "../../users/entities/user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fileName: string

    @Column()
    dataURL: string

    @OneToOne(() => User, user => user.profile, { onDelete: "CASCADE" })
    user: User
}