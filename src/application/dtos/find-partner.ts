import { type Partner } from '@/domain/entities/partner';

export type FindPartnerByIdUseCaseInput = {
	id: string;
};

export type FindPartnerByIdUseCaseOutput = {
	partner: Partner;
};
