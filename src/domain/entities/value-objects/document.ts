import { ValueObject } from '@/@core/domain/value-object';

import { BrazilianUtils } from '@/@libs/brazilian-utils';

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
		value = this.#format(value);

		if (
			value.length !== this.#CNPJ_LENGTH &&
			value.length !== this.#CPF_LENGTH
		) {
			throw new DocumentError(`Invalid document value.`);
		}

		const isCNPJ = this.isCNPJ(value);

		// CNPJ
		if (isCNPJ) {
			if (!Document.#isValidCNPJ(value)) {
				throw new DocumentError(`Invalid CNPJ value.`);
			}
		}

		const isCPF = this.isCPF(value);

		if (isCPF) {
			if (!Document.#isValidCPF(value)) {
				throw new DocumentError(`Invalid CPF value.`);
			}
		}
	}

	static isCNPJ(value: string) {
		return value.length === this.#CNPJ_LENGTH;
	}

	static isCPF(value: string) {
		return value.length === this.#CPF_LENGTH;
	}

	static #format(value: string): string {
		return clearString(value);
	}

	static #isValidCNPJ(value: string): boolean {
		return BrazilianUtils.isValidCNPJ(value);
	}

	static #isValidCPF(value: string): boolean {
		return BrazilianUtils.isValidCPF(value);
	}
}
