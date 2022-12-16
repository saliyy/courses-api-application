import {Controller, HttpCode, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FilesService} from './files.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {Post} from '@nestjs/common';
import FileElementsResponse from './response/file-elements.response';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';

@Controller('files')
export class FilesController {
	constructor(private readonly fileService: FilesService) {}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async upload(@UploadedFile() file: Express.Multer.File): Promise<FileElementsResponse[]> {
		return this.fileService.saveFiles([file]);
	}
}
