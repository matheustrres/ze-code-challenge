import { CreatePartnerUseCase } from '@/app/use-cases/create-partner';

import { makePartnersRepository } from '@/main/factories/repositories/partners-repository';

export function makeCreatePartnerUseCase(): CreatePartnerUseCase {
	return new CreatePartnerUseCase(makePartnersRepository());
}
