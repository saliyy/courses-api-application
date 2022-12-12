import { Injectable } from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import {TopPageModel} from './top-page.model';
import {ModelType} from '@typegoose/typegoose/lib/types';
import {CreateTopPageDto} from './dto/create-top-page.dto';
import {FindTopPageDto} from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async delete(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, updateDto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
	}

	async findWithCategories(dto: FindTopPageDto) {
		return this.topPageModel.find({ firstCategory: dto.firstCategory }).exec();
	}
}
