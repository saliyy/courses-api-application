import { Injectable } from '@nestjs/common';
import FileElementsResponse from './response/file-elements.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import * as pathNative from 'path';
import {ensureDir, writeFile} from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	async saveFiles(files: Express.Multer.File[]): Promise<FileElementsResponse[]> {
		const uploadFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadDir = `${path}/uploads/${uploadFolder}`;
		await ensureDir(uploadDir);

		const uploadedFiles: FileElementsResponse[] = [];

		const getFilePath = (file: Express.Multer.File) => {
			return `${uploadDir}/${file.originalname}`;
		};

		for (const file of files) {
			if (file.mimetype.includes('image')) {
				file.originalname = pathNative.parse(file.originalname).name + '.webp';
				await sharp(file.buffer)
					.resize(800)
					.webp()
					.toFile(getFilePath(file));
			} else {
				await writeFile(getFilePath(file), file.buffer);
			}

			uploadedFiles.push({
				url: getFilePath(file),
				name: file.originalname
			});
		}

		return uploadedFiles;
	}
}
