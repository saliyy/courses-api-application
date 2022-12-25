import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {CreateReviewDto} from './dto/create-review.dto';
import {ReviewService} from './review.service';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';
import {TelegramService} from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {

	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService
	) {}

	@Post('create')
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Post('notify')
	@UseGuards(JwtAuthGuard)
	async notify(@Body() dto: CreateReviewDto) {
		const message = this.reviewService.getFormatForTelegram(dto);
		return this.telegramService.sendMessage(message);
	}


	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException('', HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}


	@Delete('byProduct/:productId')
	@UseGuards(JwtAuthGuard)
	async deleteByProduct(@Param('productId') productId: string) {
		return this.reviewService.deleteProductId(productId);
	}
}
