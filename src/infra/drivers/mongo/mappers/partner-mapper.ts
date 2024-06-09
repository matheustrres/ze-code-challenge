import { type PartnerModel } from '../models/partner';

import { type Mapper } from '@/@core/contracts/mapper';
import { EntityId } from '@/@core/domain/entity-id';

import { Partner } from '@/domain/entities/partner';
import { Address } from '@/domain/entities/value-objects/address';
import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { Document } from '@/domain/entities/value-objects/document';

export class PartnerMapper implements Mapper<Partner, PartnerModel> {
	toDomain(model: PartnerModel): Partner {
		return Partner.restore({
			id: new EntityId(model.id),
			props: {
				...model,
				address: Address.create(model.address),
				coverageArea: CoverageArea.create(model.coverageArea),
				document: Document.create({
					value: model.document,
				}),
			},
		});
	}

	toInfra(entity: Partner): PartnerModel {
		const { address, coverageArea, document, ...rest } = entity.getProps();

		return {
			...rest,
			id: entity.id.toNumber(),
			address: address.props,
			coverageArea: coverageArea.props,
			document: document.props.value,
			createdAt: entity.createdAt,
		};
	}
}
