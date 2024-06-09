import { FindPartnerByIdController } from '@/infra/http/controllers/partners/find-partner';

import { makeFindPartnerByIdUseCase } from '@/main/factories/use-cases/find-partner';

export function makeFindPartnerByIdController() {
	return new FindPartnerByIdController(makeFindPartnerByIdUseCase());
}
