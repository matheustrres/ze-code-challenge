export class CoverageAreaError extends Error {
	constructor(message: string) {
		super(`CoverageAreaError: ${message}`);

		Error.captureStackTrace(this, this.constructor);
	}
}
