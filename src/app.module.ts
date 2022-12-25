import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypegooseModule} from 'nestjs-typegoose';
import {getMongoConfig} from './config/mongo.config';
import { FilesModule } from './files/files.module';
import { TelegramModule } from './telegram/telegram.module';
import {getTelegramConfig} from './config/telegram.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig
		}),
		TelegramModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTelegramConfig
		}),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		FilesModule,
	]
})
export class AppModule { }
