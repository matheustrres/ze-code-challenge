import { FindPartnerByIdUseCase } from '@/app/use-cases/find-partner';

import { makePartnersRepository } from '@/main/factories/repositories/partners-repository';

export function makeFindPartnerByIdUseCase() {
	return new FindPartnerByIdUseCase(makePartnersRepository());
}
