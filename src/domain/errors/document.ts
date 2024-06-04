export class DocumentError extends Error {
	constructor(message: string) {
		super(`DocumentError: ${message}`);

		Error.captureStackTrace(this, this.constructor);
	}
}
