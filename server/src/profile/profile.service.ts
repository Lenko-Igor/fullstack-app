import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { FilesService } from '../files/files.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEnum } from '../types/enums';
import { User } from '../users/entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        private filesService: FilesService,
    ) { }

    async createProfile(user: User, image: string): Promise<Profile> {
        const imageUrl = image ? await this.filesService.createFile(image) : '';
        const profile = this.profileRepository.create({
            image: imageUrl,
            user
        });

        return this.profileRepository.save(profile);
    }

    async updateProfile(profileId: string, updateProfileDto: UpdateProfileDto): Promise<string> {
        const { image } = updateProfileDto
        const imageUrl = image ? await this.filesService.createFile(image) : '';

        await this.profileRepository.update(profileId, { ...updateProfileDto, image: imageUrl })
            .catch(e => { throw new Error(e) });

        return imageUrl
    }

    async getAllProfiles(): Promise<Profile[]> {
        const profiles = await this.profileRepository.find();

        if (!profiles || profiles.length === 0) {
            throw new HttpException(ErrorEnum.PROFILES_LIST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return profiles
    }

    async getProfileById(profileId: string): Promise<Profile> {
        const profile = await this.profileRepository.findOneBy({ id: profileId });

        if (!profile) {
            throw new HttpException(ErrorEnum.PROFILE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return profile
    }

    async removeProfile(profileId: string): Promise<string> {
        const profile = await this.profileRepository.findOneBy({ id: profileId }).catch(e => { throw new Error(e) });
        await this.profileRepository.remove(profile).catch(e => { throw new Error(e) });
        return 'This profile was removed'
    }
}