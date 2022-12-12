import {
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
import { FindProductDto } from './dto/find-product.dto';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductService} from './product.service';
import {IdValidatePipe} from './pipes/IdValidatePipe';
import {JwtAuthGuard} from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) {}

	@Post('create')
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidatePipe) id: string) {
		const product = await this.productService.findById(id);

		if (!product) {
			throw new NotFoundException('not found product');
		}

		return product;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	async delete(@Param('id', IdValidatePipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);

		if (!deletedProduct) {
			throw new NotFoundException('not found product');
		}

		return deletedProduct;
	}

	@Patch(':id')
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	async patch(@Param('id', IdValidatePipe) id: string, @Body() dto: CreateProductDto) {
		const productToUpdate = await this.productService.updateById(id, dto);

		if (!productToUpdate) {
			throw new NotFoundException('not found product to update');
		}

		return productToUpdate;
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
