import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { type MultiPolygon } from '@/core/domain/types';

import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { CoverageAreaError } from '@/domain/errors/coverage-area';

describe('CoverageArea value object', () => {
	it('should throw if given coverage area type is not MultiPolygon', () => {
		const invalidMultiPolygon = {
			type: 'Point',
			coordinates: [],
		};

		throws(
			() => CoverageArea.create(invalidMultiPolygon as MultiPolygon),
			new CoverageAreaError('Coverage area type must be "MultiPolygon".'),
		);
	});

	it('should throw if given coverage area coordinates is not an array of numbers', () => {
		const invalidMultiPolygon = {
			type: 'MultiPolygon',
			coordinates: {},
		};

		throws(
			() => CoverageArea.create(invalidMultiPolygon as MultiPolygon),
			new CoverageAreaError(
				'Coverage area coordinates must be an array of numbers.',
			),
		);
	});

	it(`should throw if any coordinates' polygon is not an array of numbers`, () => {
		const invalidMultiPolygon = {
			type: 'MultiPolygon',
			coordinates: [
				{}, // polygon not an array
			],
		} as MultiPolygon;

		throws(
			() => CoverageArea.create(invalidMultiPolygon),
			new CoverageAreaError(
				`Each coordinates' polygon must be an array of numbers.`,
			),
		);
	});

	it(`should throw if any polygon's ring is not an array pf numbers`, () => {
		const invalidMultiPolygon = {
			type: 'MultiPolygon',
			coordinates: [
				[
					{}, // ring not an array
				],
			],
		} as MultiPolygon;

		throws(
			() => CoverageArea.create(invalidMultiPolygon),
			new CoverageAreaError(
				'Each ring in a polygon must be an array of numbers.',
			),
		);
	});

	it('should throw if any position in a ring is not an array of two numbers', () => {
		const invalidMultiPolygon = {
			type: 'MultiPolygon',
			coordinates: [
				[
					[
						[30, 20],
						[45, 40],
						[10, 40],
						[30, 20],
						[30], // invalid position
					],
				],
			],
		} as MultiPolygon;

		throws(
			() => CoverageArea.create(invalidMultiPolygon),
			new CoverageAreaError(
				'Each position in a ring must be an array of two numbers.',
			),
		);
	});

	it('should create a valid coverage area', () => {
		const validMultiPolygon: MultiPolygon = {
			type: 'MultiPolygon',
			coordinates: [
				[
					[
						[30, 20],
						[45, 40],
						[10, 40],
						[30, 20],
					],
				],
				[
					[
						[15, 5],
						[40, 10],
						[10, 20],
						[5, 10],
						[15, 5],
					],
				],
			],
		} as MultiPolygon;

		const coverageArea = CoverageArea.create(validMultiPolygon);

		deepStrictEqual(coverageArea.props.type, 'MultiPolygon');
		deepStrictEqual(coverageArea.props.coordinates[0]![0]!.length, 4);
	});
});
