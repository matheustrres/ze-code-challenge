export class AddressError extends Error {
	constructor(message: string) {
		super(`AddressError: ${message}`);

		Error.captureStackTrace(this, this.constructor);
	}
}
