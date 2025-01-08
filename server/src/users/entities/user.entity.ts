import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BasicEntity } from '../../utiles/basic'
import { Profile } from '../../profile/entities/profile.entity';
import { profile } from 'console';
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

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile: Profile
}
