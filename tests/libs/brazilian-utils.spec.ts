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
	});
});
