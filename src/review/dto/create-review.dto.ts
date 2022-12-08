import {IsNumber, IsString, Max, Min} from 'class-validator';


export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Min(1, { message: 'Рэйтинг не может быть меньше 1' })
	@Max(5, { message: 'Рэйтинг не может быть больше 5' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
