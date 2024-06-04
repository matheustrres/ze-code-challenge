import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { type Point } from '@/core/domain/types';

import { Address } from '@/domain/entities/value-objects/address';
import { AddressError } from '@/domain/errors/address';

describe('Address value object', () => {
	it('should throw if given address type is not Point', () => {
		const invalidPoint = {
			type: 'Linear',
			coordinates: [],
		};

		throws(
			() => Address.create(invalidPoint as Point),
			new AddressError('Address type must be "Point".'),
		);
	});
});
