import { type PartnersRepository } from '@/app/partners-repository';

import { MongoPartnersRepository } from '@/infra/drivers/mongo/repositories/partners-repository';

export function makePartnersRepository(): PartnersRepository {
	return new MongoPartnersRepository();
}
