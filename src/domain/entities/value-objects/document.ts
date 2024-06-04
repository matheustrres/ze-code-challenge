import { BrazilianUtils } from '@/libs/brazilian-utils';

import { ValueObject } from '@/core/domain/value-object';

import { DocumentError } from '@/domain/errors/document';

import { clearString } from '@/shared/utils/funcs/clear-string';

export type DocumentProps = {
	value: string;
};

export class Document extends ValueObject<DocumentProps> {
	static readonly #CNPJ_LENGTH = 14;
	static readonly #CPF_LENGTH = 11;

	private constructor(props: DocumentProps) {
		super(props);
	}

	static create(props: DocumentProps): Document {
		Document.#validate(props);

		return new Document(props);
	}

	static #validate({ value }: DocumentProps): void {
		const cleanValue = clearString(value);

		// CNPJ
		if (cleanValue.length === this.#CNPJ_LENGTH) {
			if (!Document.#isValidCNPJ(cleanValue)) {
				throw new DocumentError(`Invalid CNPJ value.`);
			}
		}

		// CPF
		if (cleanValue.length === this.#CPF_LENGTH) {
			if (!Document.#isValidCPF(value)) {
				throw new DocumentError(`Invalid CPF value.`);
			}
		}

		throw new DocumentError(`Invalid document value.`);
	}

	static #isValidCNPJ(value: string): boolean {
		return BrazilianUtils.isValidCNPJ(value);
	}

	static #isValidCPF(value: string): boolean {
		return BrazilianUtils.isValidCPF(value);
	}
}
