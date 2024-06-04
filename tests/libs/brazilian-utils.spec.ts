import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { BrazilianUtils } from '@/libs/brazilian-utils';

describe('BrazilianUtils lib', () => {
	describe('.isValidCPF', () => {
		it('should return false if an invalid value is provided', () => {
			deepStrictEqual(BrazilianUtils.isValidCPF(''), false);
			deepStrictEqual(BrazilianUtils.isValidCPF('11257245286'), false);
			deepStrictEqual(BrazilianUtils.isValidCPF('abcdefghtia'), false);
			deepStrictEqual(BrazilianUtils.isValidCPF('123456'), false);
		});

		it('should return true if a valid value is provided', () => {
			deepStrictEqual(BrazilianUtils.isValidCPF('403.64478-829'), true);
			deepStrictEqual(BrazilianUtils.isValidCPF('256.657.510-06'), true);
			deepStrictEqual(BrazilianUtils.isValidCPF('105.068.620-97'), true);
			deepStrictEqual(BrazilianUtils.isValidCPF('93867339007'), true);
		});
	});

	describe('.isValidCNPJ', () => {
		it('should return false if an invalid value is provided', () => {
			deepStrictEqual(BrazilianUtils.isValidCNPJ(''), false);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('121das'), false);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('12312312312'), false);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('123456'), false);
		});

		it('should return true if a valid value is provided', () => {
			deepStrictEqual(BrazilianUtils.isValidCNPJ('75.054.071/0001-76'), true);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('41220350000140'), true);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('93184.333/000107'), true);
			deepStrictEqual(BrazilianUtils.isValidCNPJ('28.969.938/0001-33'), true);
		});
	});
});
