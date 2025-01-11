import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { ErrorEnum } from '../types/enums';

@Injectable()
export class FilesService {
    async createFile(file: any): Promise<string> {
        try {
            const fileName = file.originalname.split(' ').join('')
            const filesDirPath = path.resolve(__dirname, '..', 'static')

            if (!fs.existsSync(filesDirPath)) {
                fs.mkdirSync(filesDirPath, { recursive: true })
            }

            fs.writeFileSync(path.join(filesDirPath, fileName), file.buffer)

            const filePath = path.resolve(__dirname, '..', 'static', fileName)
            return this.getImageUrl(fileName, filePath)
        } catch (error) {
            throw new HttpException(ErrorEnum.FILE_NOT_UPLOADED, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private getImageUrl(fileName: string, filePath: string): string {
        const mime = `image/${fileName.split('.')[1]}`
        const encoding = 'base64'
        const data = fs.readFileSync(filePath, { encoding });

        return `data:${mime};${encoding},${data}`
    }
}
