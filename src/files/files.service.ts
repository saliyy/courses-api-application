import { Injectable } from '@nestjs/common';
import FileElementsResponse from './response/file-elements.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import {ensureDir, writeFile} from 'fs-extra';

@Injectable()
export class FilesService {
	async saveFiles(files: Express.Multer.File[]): Promise<FileElementsResponse[]> {
		const uploadFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadDir = `${path}/uploads/${uploadFolder}`;
		await ensureDir(uploadDir);

		const uploadedFiles: FileElementsResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadDir}/${file.originalname}`, file.buffer);
			uploadedFiles.unshift({
				url: `${uploadDir}/${file.originalname}`,
				name: file.originalname
			});
		}

		return uploadedFiles;
	}
}
