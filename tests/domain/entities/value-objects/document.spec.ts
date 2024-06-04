import { deepStrictEqual, throws } from 'node:assert';
import { describe, it } from 'node:test';

import { Document } from '@/domain/entities/value-objects/document';
import { DocumentError } from '@/domain/errors/document';

import { clearString } from '@/shared/utils/funcs/clear-string';

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

	it('should throw if an invalid CPF is provided', () => {
		throws(
			() => Document.create({ value: '98765432143' }),
			new DocumentError(`Invalid CPF value.`),
		);
	});

	it('should create a CNPJ document', () => {
		const doc = Document.create({ value: '54.183.716/0001-09' });

		deepStrictEqual(doc.props.value, '54.183.716/0001-09');
		deepStrictEqual(Document.isCNPJ(clearString(doc.props.value)), true);
	});
});
