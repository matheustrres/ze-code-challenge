import { type Position } from '@/@core/domain/types';

import { type Partner } from '@/domain/entities/partner';

export type CreatePartnerInput = {
	ownerName: string;
	tradingName: string;
	document: string;
	coverageArea: Position[][][];
	address: Position;
};

export type CreatePartnerOutput = {
	partner: Partner;
};
