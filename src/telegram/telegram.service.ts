import {Inject, Injectable} from '@nestjs/common';
import TelegramOptions, {TELEGRAM_OPTIONS_VALUE_PROVIDE} from './telegram-options.interface';
import {Telegraf} from 'telegraf';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: TelegramOptions;

	constructor(@Inject(TELEGRAM_OPTIONS_VALUE_PROVIDE) options: TelegramOptions) {
		this.bot = new Telegraf(options.token);
		this.options = options;
	}


	public async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}
