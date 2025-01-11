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
        const { fileName, dataURL } = image
            ? await this.filesService.createFile(image)
            : { fileName: '', dataURL: '' };
        const profile = this.profileRepository.create({
            fileName,
            dataURL,
            user
        });

        return this.profileRepository.save(profile);
    }

    async updateProfile(profileId: string, image: string): Promise<string> {
        const { fileName, dataURL } = image
            ? await this.filesService.createFile(image)
            : { fileName: '', dataURL: '' };

        await this.profileRepository.update(profileId, { fileName, dataURL })
            .catch(e => { throw new Error(e) });

        return 'This profile was updated'
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