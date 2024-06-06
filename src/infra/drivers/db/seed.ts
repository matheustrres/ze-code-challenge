import fs from 'node:fs';
import path from 'node:path';

import { type AnyBulkWriteOperation } from 'mongoose';

import { PartnerModel } from './models/partner';

import { type MultiPolygon, type Point } from '@/core/domain/types';

import { Logger } from '@/shared/utils/logger';

const logger = new Logger('Seed');

type PDV = {
	id: string;
	tradingName: string;
	ownerName: string;
	coverageArea: MultiPolygon;
	point: Point;
};

type Seed = {
	pdvs: PDV[];
};

export async function seedPdvs() {
	logger.info('Starting database seed...');

	const data = fs.readFileSync(
		path.resolve(process.cwd(), 'assets/pdvs.json'),
		'utf8',
	);

	const seed = JSON.parse(data) as Seed;
	const batchSize = 10;

	logger.info(`Items loaded: ${seed.pdvs.length}`);

	let bulkOperations: AnyBulkWriteOperation<any>[] = [];

	for (const pdv of seed.pdvs) {
		bulkOperations.push({
			insertOne: {
				document: {
					...pdv,
					id: parseInt(pdv.id),
				},
			},
		});

		if (bulkOperations.length === batchSize) {
			try {
				const result = await PartnerModel.bulkWrite(bulkOperations, {
					ordered: false,
				});

				logger.info(`Bulk write result: ${JSON.stringify(result)}`);

				bulkOperations = [];
			} catch (error) {
				logger.error(`Error while bulk writing: ${error}`);
			}
		}
	}

	if (bulkOperations.length) {
		try {
			const result = await PartnerModel.bulkWrite(bulkOperations, {
				ordered: false,
			});
			logger.info(`Bulk write result: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error('Error while bulk writing: ', error);
		}
	}
}
