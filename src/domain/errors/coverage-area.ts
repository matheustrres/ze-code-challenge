import { ServerError } from '@/@core/domain/errors/server-error';

export class CoverageAreaError extends ServerError {
	constructor(message: string) {
		super(`CoverageAreaError: ${message}`, 400);
	}
}
