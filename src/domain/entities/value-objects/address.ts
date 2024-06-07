import { type Point } from '@/@core/domain/types';
import { ValueObject } from '@/@core/domain/value-object';

import { AddressError } from '@/domain/errors/address';

export class Address extends ValueObject<Point> {
	private constructor(props: Point) {
		super(props);
	}

	static create(props: Point): Address {
		Address.#validate(props);

		return new Address(props);
	}

	static #validate({ coordinates, type }: Point): void {
		if (type !== 'Point') {
			throw new AddressError('Address type must be "Point".');
		}

		if (!Array.isArray(coordinates) || coordinates.length !== 2) {
			throw new AddressError(
				'Address coordinates must be an array of two numbers.',
			);
		}

		if (
			typeof coordinates[0] !== 'number' ||
			typeof coordinates[1] !== 'number'
		) {
			throw new AddressError(
				'Address coordinates must be an array of two numbers.',
			);
		}
	}
}
