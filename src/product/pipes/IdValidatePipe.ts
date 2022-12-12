import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {Types} from 'mongoose';

export class IdValidatePipe implements PipeTransform {
	transform(value: number | string, metadata: ArgumentMetadata): number | string {
		if (metadata.type != 'param') {
			return value;
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException('invalid id');
		}

		return value;
	}
}
