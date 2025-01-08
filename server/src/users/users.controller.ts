import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { Request } from 'express'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('current')
    getCurrentUser(@Req() req: Request) {
        return this.usersService.getCurrentUser(req)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createUser(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() image: string
    ) {
        return this.usersService.createUser(createUserDto, image)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/remove/:userId')
    removeUserById(@Param('userId') userId: string) {
        return this.usersService.removeUser(+userId)
    }
}
