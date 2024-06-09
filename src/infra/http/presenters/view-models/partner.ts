import { type MultiPolygon, type Point } from '@/@core/domain/types';

import { type Partner } from '@/domain/entities/partner';

type PartnerJSON = {
	id: number;
	ownerName: string;
	tradingName: string;
	document: string;
	address: Point;
	coverageArea: MultiPolygon;
	createdAt: Date;
};

export class PartnerViewModel {
	static toJSON(partner: Partner): PartnerJSON {
		const { ownerName, tradingName, document, address, coverageArea } =
			partner.getProps();

		return {
			id: partner.id.toNumber(),
			ownerName,
			tradingName,
			document: document.props.value,
			address: address.props,
			coverageArea: coverageArea.props,
			createdAt: partner.createdAt,
		};
	}
}
