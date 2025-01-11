import { IsString } from "class-validator";

export class ImageFilesDto {
    @IsString()
    fileName: string;

    @IsString()
    dataURL: string;
}