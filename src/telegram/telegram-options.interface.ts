import { ModuleMetadata } from '@nestjs/common';

export default interface TelegramOptions {
	chatId: string;
	token: string;
}


export const TELEGRAM_OPTIONS_VALUE_PROVIDE = 'TELEGRAM_OPTIONS_VALUE_PROVIDE';


export interface AsyncTelegramModuleOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<TelegramOptions> | TelegramOptions;
	inject: any[];
}