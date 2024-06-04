import { throws } from 'node:assert';
import { describe, it } from 'node:test';

import { Document } from '@/domain/entities/value-objects/document';
import { DocumentError } from '@/domain/errors/document';

describe('Document value object', () => {
	it('should throw if document value length is not 11 or 14', () => {
		throws(
			() => Document.create({ value: '111111111' }),
			new DocumentError('Invalid document value.'),
		);
	});

	it('should throw if an invalid CNPJ is provided', () => {
		throws(
			() => Document.create({ value: '12345678912341' }),
			new DocumentError(`Invalid CNPJ value.`),
		);
	});
});
