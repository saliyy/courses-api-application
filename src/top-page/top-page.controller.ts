import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post, UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import {CreateTopPageDto} from './dto/create-top-page.dto';
import {TopPageService} from './top-page.service';
import {IdValidatePipe} from '../product/pipes/IdValidatePipe';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService) {}


	@Post('create')
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidatePipe) id: string) {
		const topPage = await this.topPageService.findById(id);

		if (!topPage) {
			throw new NotFoundException('not found top page');
		}

		return topPage;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id', IdValidatePipe) id: string) {
		const deletedTopPage = await this.topPageService.delete(id);

		if (!deletedTopPage) {
			throw new NotFoundException('error to delete');
		}

		return deletedTopPage;
	}


	@Get('byAlias/:byAlias')
	async getByAlias(@Param('byAlias') alias: string) {
		const pageByAlias = await this.topPageService.findByAlias(alias);

		if (!pageByAlias) {
			throw new BadRequestException('no found page with such alias');
		}

		return pageByAlias;
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	async patch(@Param('id', IdValidatePipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);

		if (!updatedPage) {
			throw new NotFoundException('error to update');
		}

		return updatedPage;
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		const pagesByCategory = await this.topPageService.findWithCategories(dto);

		if (!pagesByCategory.length) {
			throw new BadRequestException('no pages with such category');
		}

		return pagesByCategory;
	}

	@Get('textSearch/:text')
	async findByText(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
