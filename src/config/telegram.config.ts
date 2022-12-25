import TelegramOptions from '../telegram/telegram-options.interface';
import {ConfigService} from '@nestjs/config';

export const getTelegramConfig = (service: ConfigService): TelegramOptions => {

	const chatId = service.get('TELEGRAM_CHAT_ID');
	const token = service.get('TELEGRAM_TOKEN');

	if (!token || !chatId) {
		throw new Error('telegram options not configured');
	}

	return { chatId, token };
};