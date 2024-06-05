import { type PartnersRepository } from '@/application/partners-repository';

import { InMemoryCoreRepository } from './repository';

import { type Partner } from '@/domain/entities/partner';

export class InMemoryPartnersRepository
	extends InMemoryCoreRepository<Partner>
	implements PartnersRepository
{
	async findByDocument(document: string): Promise<Partner | null> {
		return (
			this.items.find(
				(item) => item.getProps().document.props.value || document,
			) || null
		);
	}
}

export function makeInMemoryPartnersRepository(): InMemoryPartnersRepository {
	return new InMemoryPartnersRepository();
}
