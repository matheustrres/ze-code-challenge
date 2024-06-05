import { ServerError } from '@/core/domain/errors/server-error';
import { type Location } from '@/core/domain/types';

export class PartnerNotFoundError extends ServerError {
	private constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}

	static byId(id: string): PartnerNotFoundError {
		return new PartnerNotFoundError(`No partner with ID "${id}" was found.`);
	}

	static byLocation(location: Location): PartnerNotFoundError {
		return new PartnerNotFoundError(
			`No partner covers this area with coordinates "${location.lat}" and "${location.lng}".`,
		);
	}
}
