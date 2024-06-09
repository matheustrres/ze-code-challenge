import { type Request, type Response } from 'express';

import { Controller } from '@/@core/contracts/controller';

type HealthCheck = {
	timestamp: string;
	status: string;
	uptime: number;
};

export class HealthController extends Controller {
	prefix = '/health';

	constructor() {
		super();

		this.$initRoute();
	}

	protected $initRoute(): void {
		this.router.get(this.prefix, this.$handle);
	}

	$handle = async (
		_request: Request,
		response: Response,
	): Promise<Response> => {
		const healthcheck: HealthCheck = {
			timestamp: new Date().toISOString(),
			status: 'OK',
			uptime: process.uptime(),
		};

		return response.status(200).json(healthcheck);
	};
}
