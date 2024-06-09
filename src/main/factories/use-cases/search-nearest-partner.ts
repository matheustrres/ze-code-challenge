import { SearchNearestPartnerUseCase } from '@/app/use-cases/search-nearest-partner';

import { makePartnersRepository } from '@/main/factories/repositories/partners-repository';

export function makeSearchNearestPartnerUseCase(): SearchNearestPartnerUseCase {
	return new SearchNearestPartnerUseCase(makePartnersRepository());
}
