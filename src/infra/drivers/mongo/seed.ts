import fs from 'node:fs';
import { join } from 'node:path';

import { type AnyBulkWriteOperation } from 'mongoose';

import { Database } from './database';
import { PartnerMapper } from './mappers/partner-mapper';
import { PartnerModel } from './models/partner';

import { type MultiPolygon, type Point } from '@/@core/domain/types';

import { Logger } from '@/shared/utils/logger';

const logger = new Logger('SEED');

type PDV = {
	id: number;
	tradingName: string;
	ownerName: string;
	document: string;
	coverageArea: MultiPolygon;
	address: Point;
};

type Seed = {
	pdvs: PDV[];
};

function loadSeedFile(path = 'assets/pdvs.json'): Seed {
	const filePath = join(process.cwd(), path);
	const data = fs.readFileSync(filePath, 'utf8');

	return JSON.parse(data) as Seed;
}

function mapPDVsToBulk(pdvs: PDV[]): AnyBulkWriteOperation<PartnerModel>[] {
	return pdvs.map((pdv) => {
		const partner = new PartnerMapper().toDomain({
			...pdv,
			createdAt: new Date(),
		});

		return {
			insertOne: {
				document: new PartnerMapper().toInfra(partner),
			},
		};
	});
}

function createBatches<T>(array: T[], size: number): T[][] {
	const batches: T[][] = [];

	for (let i = 0; i < array.length; i += size) {
		batches.push(array.slice(i, i + size));
	}

	return batches;
}

async function seedPDVs(): Promise<void> {
	logger.info('Starting seeding...');

	const seed = loadSeedFile();

	const mappedPDVs = mapPDVsToBulk(seed.pdvs);

	logger.info(`PDVs loaded: ${mappedPDVs.length}`);

	if (mappedPDVs.length) {
		const batches = createBatches(mappedPDVs, 10);

		for (const batch of batches) {
			try {
				const result = await PartnerModel.bulkWrite(batch, {
					ordered: false,
				});

				logger.info(`Bulk write result: ${JSON.stringify(result)}`);
			} catch (error) {
				logger.error(`Error while bulk writing: ${error}`);
			}
		}

		logger.info('Seed successfully generated.');
	}
}

(async () => {
	try {
		await Database.connect();
		await seedPDVs();
		await Database.disconnect();
	} catch (error) {
		await Database.disconnect();

		logger.error(`Error while seeding against database: ${error}`);
	}
})();
