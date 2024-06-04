import { deepStrictEqual, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { Partner } from '@/domain/entities/partner';

import { PartnerBuilder } from '#/data/builders/entities/partner';

describe('Partner entity', () => {
	it('should create a new Partner', () => {
		const partner = new PartnerBuilder()
			.withOwnerName('John Doe')
			.withTradingName('Zé Delivery')
			.build();

		const { ownerName, tradingName } = partner.getProps();

		strictEqual(partner instanceof Partner, true);
		deepStrictEqual(ownerName, 'John Doe');
		deepStrictEqual(tradingName, 'Zé Delivery');
	});

	it('should restore a Partner', () => {
		const partner = new PartnerBuilder().build();

		const restoredPartner = Partner.restore({
			id: partner.id,
			props: partner.getProps(),
		});

		deepStrictEqual(restoredPartner, partner);
	});
});
