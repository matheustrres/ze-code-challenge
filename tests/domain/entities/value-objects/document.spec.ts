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
});
