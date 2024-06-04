import './shared/utils/alias';

import http from 'node:http';

import { App } from './app';
import { makeHealthController } from './main/factories/controllers/health';

import { Logger } from '@/shared/utils/logger';

const logger = new Logger('Server');

(() => {
	const app = new App({
		controllers: [makeHealthController()],
	});

	const httpServer = http.createServer(app.getInstance());

	const port = Number(process.env['PORT']) || 3333;

	httpServer.listen(port, () => {
		logger.info(`Server listening on port ${port}.`);
	});

	httpServer.on('error', (err: Error) => {
		logger.error(`Error while listening on port 3000: ${err.message}`);
	});
})();