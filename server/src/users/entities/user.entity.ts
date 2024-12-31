import { Column, Entity } from 'typeorm'
import { BasicEntity } from '../../utiles/basic'
@Entity()
export class User extends BasicEntity {
    constructor(partial: Partial<User>) {
        super()
        Object.assign(this, partial);
    }

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string
}
