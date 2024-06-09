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
		const mongoPartners = (await this.#model.find<PartnerModel>()) || [];

		return mongoPartners.map(new PartnerMapper().toDomain);
	}

	async findByDocument(document: string): Promise<Partner | null> {
		const mongoPartner = await this.#model.findOne<PartnerModel>({
			document,
		});

		if (!mongoPartner) return null;

		return new PartnerMapper().toDomain(mongoPartner);
	}

	async findById(id: number): Promise<Partner | null> {
		const mongoPartner = await this.#model.findOne<PartnerModel>({
			id,
		});

		console.log({ mongoPartner });

		if (!mongoPartner) return null;

		return new PartnerMapper().toDomain(mongoPartner);
	}

	async findNearestByLocation({ lat, lng }: Location): Promise<Partner | null> {
		const mongoPartnersCoveringLocation = await PartnerModel.find<PartnerModel>(
			{
				coverageArea: {
					$geoIntersects: {
						$geometry: {
							type: 'Point',
							coordinates: [lng, lat],
						},
					},
				},
			},
		).exec();

		if (!mongoPartnersCoveringLocation.length) return null;

		const mongoNearestPartners = await PartnerModel.aggregate<PartnerModel>([
			{
				$geoNear: {
					near: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					distanceField: 'distance',
					spherical: true,
					query: {
						id: {
							$in: mongoPartnersCoveringLocation.map((p) => p.id),
						},
					},
				},
			},
			{ $sort: { distance: 1 } },
			{ $limit: 1 },
		]);

		if (!mongoNearestPartners.length) return null;

		return new PartnerMapper().toDomain(mongoNearestPartners[0]!);
	}

	async upsert(domainEntity: Partner): Promise<void> {
		await this.#model.create(new PartnerMapper().toInfra(domainEntity));
	}
}
