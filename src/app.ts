import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { Controller } from '@/core/contracts/controller';

import { Logger } from '@/shared/utils/logger';

type AppOptions = {
	controllers: Controller[];
	middlewares?: any[];
};

export class App {
	#app!: express.Application;

	readonly #logger = new Logger('APP');

	static validate({ controllers }: AppOptions) {
		if (!controllers.length || !Array.isArray(controllers)) {
			throw new TypeError('Argument {controllers} must be an array.');
		}

		if (
			controllers.every((controller) => !(controller instanceof Controller))
		) {
			throw new TypeError('Argument {controller} must be a Controller.');
		}
	}

	constructor(options: AppOptions) {
		App.validate(options);

		this.#initApp(options);
	}

	#initApp({ controllers }: AppOptions) {
		this.#app = express();

		this.#initMiddlewares();
		this.#initControllers(controllers);
	}

	#initMiddlewares() {
		this.#app.use(express.json());
		this.#app.use(
			express.urlencoded({
				extended: true,
				inflate: true,
			}),
		);
		this.#app.use(
			cors({
				origin: '*',
				credentials: true,
				methods: 'GET,PUT,PATCH,POST,DELETE',
				allowedHeaders:
					'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
			}),
		);
		this.#app.use(
			helmet({
				contentSecurityPolicy: true,
				hsts: true,
				frameguard: true,
			}),
		);
	}

	#initControllers(controllers: Controller[]): void {
		controllers.forEach((controller) => {
			this.#app.use('/api/v1', controller.router);
			this.#logger.info(`Route "/api/v1${controller.prefix}" registered.`);
		});
	}

	getInstance() {
		return this.#app;
	}
}
