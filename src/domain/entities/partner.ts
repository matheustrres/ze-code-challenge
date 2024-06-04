import { PartnerId } from './partner-id';
import { type Address } from './value-objects/address';
import { type CoverageArea } from './value-objects/coverage-area';

import { type CreateEntityProps, Entity } from '@/core/domain/entity';

export type PartnerProps = {
	tradingName: string;
	ownerName: string;
	document: string;
	coverageArea: CoverageArea;
	address: Address;
};

export type PartnerConstructorProps = CreateEntityProps<
	PartnerId,
	PartnerProps
>;

export class Partner extends Entity<PartnerId, PartnerProps> {
	private constructor(props: PartnerConstructorProps) {
		super(props);
	}

	static create(props: PartnerProps, id?: number): Partner {
		return new Partner({
			id: new PartnerId(id),
			props,
		});
	}

	static restore(props: PartnerConstructorProps): Partner {
		return new Partner(props);
	}

	protected $validate(): void {}
}
