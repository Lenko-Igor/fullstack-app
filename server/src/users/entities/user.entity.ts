import { Column, Entity } from 'typeorm'
import { BasicEntity } from '../../utiles/basic'

@Entity()
export class User extends BasicEntity {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
