import { SearchNearestPartnerController } from '@/infra/http/controllers/partners/search-nearest-partner';

import { makeSearchNearestPartnerUseCase } from '@/main/factories/use-cases/search-nearest-partner';

export function makeSearchNearestPartnerController(): SearchNearestPartnerController {
	return new SearchNearestPartnerController(makeSearchNearestPartnerUseCase());
}
