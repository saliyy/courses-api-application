import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {CreateReviewDto} from './dto/create-review.dto';
import {ReviewService} from './review.service';

@Controller('review')
export class ReviewController {

	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException('', HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		const a ='dsadasd';
		return this.reviewService.findByProductId(productId);
	}


	@Delete('byProduct/:productId')
	async deleteByProduct(@Param('productId') productId: string) {
		return this.reviewService.deleteProductId(productId);
	}
}
