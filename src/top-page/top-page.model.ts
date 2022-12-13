import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {index, prop} from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class Hh {
	@prop()
	count: number;
	@prop()
	juniorSalary: number;
	@prop()
	middleSalary: number;
	@prop()
	seniorSalary: number;
}

export class TopLevelAdvantages {
	@prop()
	title: string;
	@prop()
	description: string;
}

export interface TopPageModel extends Base {}

@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;

	@prop({ type: () => [Hh] })
	hh?: Hh;

	@prop({ type: () => [TopLevelAdvantages] })
	advantages: TopLevelAdvantages[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];
}
