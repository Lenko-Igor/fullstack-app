import { BadRequestException, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { ErrorEnum } from '../types/enums'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const isExistUser = await this.userRepository.findOneBy({
            email: createUserDto.email,
        })

        if (isExistUser)
            throw new BadRequestException(ErrorEnum.USER_WITH_SUCH_EMAIL_EXISTS)

        const salt = await bcrypt.genSalt()
        return await this.userRepository.save({
            name: createUserDto.name,
            email: createUserDto.email,
            password: await bcrypt.hash(createUserDto.password, salt),
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({
            email: email,
        })
    }

    update(id: number, updateUserDto: UpdateUserDto): string {
        console.log('update user dto: ' + updateUserDto)
        return `This action updated user with id:${id}`
    }

    remove(id: number): string {
        return `Tis action gets remove ${id}`
    }
}
