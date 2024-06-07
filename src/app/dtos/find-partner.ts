import { type Partner } from '@/domain/entities/partner';

export type FindPartnerByIdUseCaseInput = {
	id: number;
};

export type FindPartnerByIdUseCaseOutput = {
	partner: Partner;
};
