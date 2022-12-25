import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {AsyncTelegramModuleOptions, TELEGRAM_OPTIONS_VALUE_PROVIDE} from './telegram-options.interface';

@Global()
@Module({})
export class TelegramModule {
	static forRootAsync(options: AsyncTelegramModuleOptions): DynamicModule {
		const asyncOptions = TelegramModule.createAsyncOptionsProvider(options);
		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService, asyncOptions],
			exports: [TelegramService]
		};
	}

	private static createAsyncOptionsProvider(options: AsyncTelegramModuleOptions): Provider {
		return {
			provide: TELEGRAM_OPTIONS_VALUE_PROVIDE,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || []
		};
	}
}