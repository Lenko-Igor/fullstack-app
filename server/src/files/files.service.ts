import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ErrorEnum } from '../types/enums';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = file.originalname.split(' ').join('')
            const filePath = path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (error) {
            throw new HttpException(ErrorEnum.FILE_NOT_UPLOADED, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
