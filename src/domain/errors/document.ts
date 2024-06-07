import { ServerError } from '@/@core/domain/errors/server-error';

export class DocumentError extends ServerError {
	constructor(message: string) {
		super(`DocumentError: ${message}`, 400);
	}
}
