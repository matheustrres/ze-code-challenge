import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { type MultiPolygon } from '@/core/domain/types';

import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { CoverageAreaError } from '@/domain/errors/coverage-area';

describe('CoverageArea value object', () => {
	it('should throw if given coverage area type is not MultiPolygon', () => {
		const invalidCoverageArea = {
			type: 'Point',
			coordinates: [
				[
					[
						[102.0, 2.0],
						[103.0, 2.0],
						[103.0, 3.0],
						[102.0, 3.0],
						[102.0, 2.0],
					],
				],
			],
		};

		throws(
			() => CoverageArea.create(invalidCoverageArea as MultiPolygon),
			new CoverageAreaError('Argument {type} must be "MultiPolygon".'),
		);
	});

	it('should throw if given coverage area coordinates is not an array', () => {
		const invalidCoverageArea = {
			type: 'MultiPolygon',
			coordinates: {},
		};

		throws(
			() => CoverageArea.create(invalidCoverageArea as MultiPolygon),
			new CoverageAreaError(
				'Argument {coordinates} must be an array of numbers.',
			),
		);
	});
});
