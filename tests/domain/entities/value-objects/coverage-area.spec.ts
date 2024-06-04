import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { type MultiPolygon } from '@/core/domain/types';

import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { CoverageAreaError } from '@/domain/errors/coverage-area';

describe('CoverageArea value object', () => {
	it('should throw if given coverage area type is not MultiPolygon', () => {
		const invalidCoverageArea = {
			type: 'Point',
			coordinates: [],
		};

		throws(
			() => CoverageArea.create(invalidCoverageArea as MultiPolygon),
			new CoverageAreaError('Coverage area type must be "MultiPolygon".'),
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
				'Coverage area coordinates must be an array of numbers.',
			),
		);
	});

	it(`should throw if any coordinates' polygon is not an array`, () => {
		const invalidCoverageArea = {
			type: 'MultiPolygon',
			coordinates: [
				{}, // polygon not an array
			],
		} as MultiPolygon;

		throws(
			() => CoverageArea.create(invalidCoverageArea),
			new CoverageAreaError(
				`Each coordinates' polygon must be an array of numbers.`,
			),
		);
	});

	it(`should throw if any polygon's ring is not an array`, () => {
		const invalidCoverageArea = {
			type: 'MultiPolygon',
			coordinates: [
				[
					{}, // ring not an array
				],
			],
		} as MultiPolygon;

		throws(
			() => CoverageArea.create(invalidCoverageArea),
			new CoverageAreaError(
				'Each ring in a polygon must be an array of numbers.',
			),
		);
	});
});
