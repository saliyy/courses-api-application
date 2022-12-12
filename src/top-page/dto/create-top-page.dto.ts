// @ts-ignore
import {Hh, TopLevelAdvantages, TopLevelCategory} from '../top-page.model';
import {IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';


class Hh {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

enum TopLevelCategory{
	Courses,
	Services,
	Books,
	Products
}

class TopLevelAdvantages {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@Type(() => Hh)
	@IsOptional()
	hh?: Hh;

	@IsArray()
	@ValidateNested()
	@Type(() => TopLevelAdvantages)
	advantages: TopLevelAdvantages[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
