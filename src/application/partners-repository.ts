import { type Repository } from '@/core/contracts/repository';
import { type Location } from '@/core/domain/types';

import { type Partner } from '@/domain/entities/partner';

export interface PartnersRepository extends Repository<Partner> {
	findByDocument(document: string): Promise<Partner | null>;
	findNearestByLocation(location: Location): Promise<Partner | null>;
}
