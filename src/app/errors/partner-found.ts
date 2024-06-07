import { ServerError } from '@/@core/domain/errors/server-error';

export class PartnerFoundError extends ServerError {
	private constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}

	static byDocument(document: string): PartnerFoundError {
		return new PartnerFoundError(
			`Document "${document}" is already associated to a partner.`,
		);
	}
}
