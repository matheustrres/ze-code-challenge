import { type MultiPolygon } from '@/core/domain/types';
import { ValueObject } from '@/core/domain/value-object';

import { CoverageAreaError } from '@/domain/errors/coverage-area';

export class CoverageArea extends ValueObject<MultiPolygon> {
	private constructor(props: MultiPolygon) {
		super(props);
	}

	static create(props: MultiPolygon): CoverageArea {
		CoverageArea.#validate(props);

		return new CoverageArea(props);
	}

	static #validate({ coordinates, type }: MultiPolygon): void {
		if (type !== 'MultiPolygon') {
			throw new CoverageAreaError('Argument {type} must be "MultiPolygon".');
		}

		if (!Array.isArray(coordinates)) {
			throw new CoverageAreaError(
				'Argument {coordinates} must be an array of numbers.',
			);
		}

		coordinates.forEach((polygon) => {
			if (!Array.isArray(polygon)) {
				throw new CoverageAreaError(
					`Each coordinate's polygon must be an array of numbers.`,
				);
			}

			polygon.forEach((ring) => {
				if (!Array.isArray(ring)) {
					throw new CoverageAreaError(
						'Each ring in a polygon must be an array of numbers.',
					);
				}

				ring.forEach((position) => {
					if (
						!Array.isArray(position) ||
						position.length !== 2 ||
						typeof position[0] !== 'number' ||
						typeof position[1] !== 'number'
					) {
						throw new CoverageAreaError(
							`Each ring's position must be an array of two numbers.`,
						);
					}
				});
			});
		});
	}
}
