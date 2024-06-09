import { SearchNearestPartnerController } from '@/infra/http/presenters/controllers/partners/search-nearest-partner';

import { makeSearchNearestPartnerUseCase } from '@/main/factories/use-cases/search-nearest-partner';

export function makeSearchNearestPartnerController(): SearchNearestPartnerController {
	return new SearchNearestPartnerController(makeSearchNearestPartnerUseCase());
}
