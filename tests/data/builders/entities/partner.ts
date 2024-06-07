import { faker } from '@faker-js/faker';

import { Partner, type PartnerProps } from '@/domain/entities/partner';
import { Address } from '@/domain/entities/value-objects/address';
import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { Document } from '@/domain/entities/value-objects/document';

import { Builder } from '#/@core/globals/builder';

export class PartnerBuilder extends Builder<PartnerProps, Partner> {
	protected $input: PartnerProps = {
		tradingName: faker.company.name(),
		ownerName: faker.person.fullName(),
		document: Document.create({
			value: '71.527.148/0001-27',
		}),
		coverageArea: CoverageArea.create({
			type: 'MultiPolygon',
			coordinates: [
				[
					[
						[30, 20],
						[45, 40],
						[10, 40],
						[30, 20],
					],
				],
				[
					[
						[15, 5],
						[40, 10],
						[10, 20],
						[5, 10],
						[15, 5],
					],
				],
			],
		}),
		address: Address.create({
			type: 'Point',
			coordinates: [-46.57421, -21.785741],
		}),
	};

	withTradingName(tradingName: string): this {
		this.$input.tradingName = tradingName;
		return this;
	}

	withOwnerName(ownerName: string): this {
		this.$input.ownerName = ownerName;
		return this;
	}

	withDocument(document: Document): this {
		this.$input.document = document;
		return this;
	}

	withCoverageArea(coverageArea: CoverageArea): this {
		this.$input.coverageArea = coverageArea;
		return this;
	}

	withAddress(address: Address): this {
		this.$input.address = address;
		return this;
	}

	build(): Partner {
		return Partner.create(this.$input);
	}
}
