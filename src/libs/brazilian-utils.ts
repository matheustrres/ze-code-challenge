import {
	formatCNPJ,
	formatCPF,
	isValidCNPJ,
	isValidCPF,
} from '@brazilian-utils/brazilian-utils';

export class BrazilianUtils {
	static isValidCNPJ(value: string): boolean {
		return isValidCNPJ(formatCNPJ(value));
	}

	static isValidCPF(value: string): boolean {
		return isValidCPF(formatCPF(value));
	}
}
