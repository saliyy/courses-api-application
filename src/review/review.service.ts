import {Injectable} from '@nestjs/common';
import {ReviewModel} from './review.model';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types';
import {CreateReviewDto} from './dto/create-review.dto';
import {InjectModel} from 'nestjs-typegoose';
import {Types} from 'mongoose';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	async deleteProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}

	public getFormatForTelegram(dto: CreateReviewDto): string {
		return `
			Имя: ${dto.name}
			Заголовок: ${dto.title}
			Описание: ${dto.description}
			Рейтинг: ${dto.rating}
			ID Продукта: ${dto.productId}
		`;
	}
}
