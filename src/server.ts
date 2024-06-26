import './shared/utils/alias';

import http from 'node:http';

import { App } from './app';
import { makeSearchNearestPartnerController } from './main/factories/controllers/partners/search-nearest-partner';

import { Database } from '@/infra/drivers/mongo/database';

import { makeHealthController } from '@/main/factories/controllers/health';
import { makeCreatePartnerController } from '@/main/factories/controllers/partners/create-partner';
import { makeFindPartnerByIdController } from '@/main/factories/controllers/partners/find-partner';

import { Logger } from '@/shared/utils/logger';

const logger = new Logger('SERVER');

(async () => {
	await Database.connect();

	const app = new App({
		controllers: [
			makeHealthController(),
			makeCreatePartnerController(),
			makeFindPartnerByIdController(),
			makeSearchNearestPartnerController(),
		],
	});

	const httpServer = http.createServer(app.getInstance());

	const port = Number(process.env['PORT']) || 3333;

	httpServer.listen(port, () => {
		logger.info(`Server listening on port ${port}.`);
	});

	process.on('SIGINT', async () => {
		await Database.disconnect();
		process.exit(0);
	});
})();
