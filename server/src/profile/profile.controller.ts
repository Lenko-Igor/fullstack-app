import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAllProfiles(): Promise<Profile[]> {
        return this.profileService.getAllProfiles();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:profileId')
    getProfileById(@Param('profileId') profileId: string): Promise<Profile> {
        return this.profileService.getProfileById(profileId);
    }

}
