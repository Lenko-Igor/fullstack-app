import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Request } from 'express'

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
    getCurrentUser(@Req() req) {
        return this.usersService.getCurrentUser(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
}
