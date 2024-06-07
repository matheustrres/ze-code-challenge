import { type Partner } from '@/domain/entities/partner';

export type SearchNearestPartnerUseCaseInput = {
	lat: number;
	lng: number;
};

export type SearchNearestPartnerUseCaseOutput = {
	partner: Partner;
};
