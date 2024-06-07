import { Router, type Request, type Response } from 'express';

export abstract class Controller {
	abstract readonly prefix: string;
	readonly router: Router;

	protected constructor() {
		this.router = Router();
	}

	protected abstract handle(
		request: Request,
		response: Response,
	): Promise<Response>;

	protected abstract initRoutes(): void;
}
