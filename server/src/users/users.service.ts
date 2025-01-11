import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { ErrorEnum } from '../types/enums'
import { ProfileService } from '../profile/profile.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly profileService: ProfileService,
    ) { }

    async createUser(createUserDto: CreateUserDto, image?: string): Promise<User> {
        const newUser = await this.userRepository.save(createUserDto)
        const profile = await this.profileService.createProfile(newUser, image);
        newUser.profile = profile

        return newUser
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            relations: {
                profile: true,
            },
        })
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({
            email: email,
        })
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id })
    }

    async getCurrentUser(request: Request): Promise<User> {
        const jwt = request.headers.authorization.split(' ')[1]
        const { id } = await this.jwtService.decode(jwt)
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                profile: true,
            }
        })

        if (!user) {
            throw new HttpException(ErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        return new User(user)
    }

    async update(id: number, updateUserDto: UpdateUserDto, image?: string): Promise<User> {
        const user = await this.findOneById(id).catch(e => { throw new Error(e) });
        const { id: profileId } = user.profile || {}

        await this.userRepository.update(user.id, updateUserDto).catch(e => { throw new Error(e) });
        await this.profileService.updateProfile(profileId, { image }).catch(e => { throw new Error(e) });

        return user
    }

    async removeUser(userId: number): Promise<string> {
        const user = await this.userRepository.findOneBy({ id: userId })

        if (!user) {
            throw new HttpException(ErrorEnum.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        const result = await this.profileService.removeProfile(user.profile.id)

        return result
    }
}
