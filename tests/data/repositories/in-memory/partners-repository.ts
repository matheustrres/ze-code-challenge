import { type PartnersRepository } from '@/application/partners-repository';

import { InMemoryCoreRepository } from './repository';

import { type Location } from '@/core/domain/types';

import { type Partner } from '@/domain/entities/partner';

import { PartnerBuilder } from '#/data/builders/entities/partner';

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

	async findNearestByLocation(_location: Location): Promise<Partner | null> {
		return new PartnerBuilder().build();
	}
}

export function makeInMemoryPartnersRepository(): InMemoryPartnersRepository {
	return new InMemoryPartnersRepository();
}
