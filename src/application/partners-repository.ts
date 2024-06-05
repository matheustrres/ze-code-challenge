import { type Repository } from '@/core/contracts/repository';

import { type Partner } from '@/domain/entities/partner';

export interface PartnersRepository extends Repository<Partner> {
	findByDocument(document: string): Promise<Partner | null>;
}
