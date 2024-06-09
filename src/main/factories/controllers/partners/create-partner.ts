import { CreatePartnerController } from '@/infra/http/presenters/controllers/partners/create-partner';

import { makeCreatePartnerUseCase } from '@/main/factories/use-cases/create-partner';

export function makeCreatePartnerController(): CreatePartnerController {
	return new CreatePartnerController(makeCreatePartnerUseCase());
}
