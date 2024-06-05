import { ServerError } from '@/core/domain/errors/server-error';

export class AddressError extends ServerError {
	constructor(message: string) {
		super(`AddressError: ${message}`, 400);
	}
}
