import { ServerError } from '@/core/domain/errors/server-error';

export class PartnerNotFoundError extends ServerError {
	private constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}

	static byId(id: string): PartnerNotFoundError {
		return new PartnerNotFoundError(`No partner with ID "${id}" was found.`);
	}
}
