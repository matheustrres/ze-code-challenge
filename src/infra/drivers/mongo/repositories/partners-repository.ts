import { PartnerMapper } from '../mappers/partner-mapper';
import { PartnerModel } from '../models/partner';

import { type Location } from '@/@core/domain/types';

import { type PartnersRepository } from '@/app/partners-repository';

import { type Partner } from '@/domain/entities/partner';

export class MongoPartnersRepository implements PartnersRepository {
	readonly #model = PartnerModel;

	async delete(id: number): Promise<void> {
		await this.#model.deleteOne({
			id,
		});
	}

	async find(): Promise<Partner[]> {
		const data = (await this.#model.find()) || [];

		return data.map(new PartnerMapper().toDomain);
	}

	async findByDocument(document: string): Promise<Partner | null> {
		const partner = await this.#model.findOne<Partner>({
			document,
		});

		if (!partner) return null;

		return partner;
	}

	async findById(id: number): Promise<Partner | null> {
		const partner = await this.#model.findOne<Partner>({
			id,
		});

		if (!partner) return null;

		return partner;
	}

	async findNearestByLocation(location: Location): Promise<Partner | null> {
		const [nearestPartner] = await this.#model.aggregate<Partner>([
			{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [location.lng, location.lat],
					},
					distanceField: 'distance',
					spherical: true,
					query: {
						coverageArea: {
							$geoIntersects: {
								$geometry: {
									type: 'Point',
									coordinates: [location.lng, location.lat],
								},
							},
						},
					},
				},
			},
			{ $sort: { distance: 1 } },
			{ $limit: 1 },
		]);

		if (!nearestPartner) return null;

		return nearestPartner;
	}

	async upsert(domainEntity: Partner): Promise<void> {
		await this.#model.create(new PartnerMapper().toInfra(domainEntity));
	}
}
