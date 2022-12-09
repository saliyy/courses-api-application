import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop} from '@typegoose/typegoose';


export interface UserModel extends Base {}
export class UserModel extends TimeStamps {

	@prop({ unique: true })
	email: string;

	@prop()
	passwordHash: string;
}
