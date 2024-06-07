import { type UseCase } from '@/@core/contracts/use-case';

import {
	type CreatePartnerInput,
	type CreatePartnerOutput,
} from '@/app/dtos/create-partner';
import { PartnerFoundError } from '@/app/errors/partner-found';
import { type PartnersRepository } from '@/app/partners-repository';

import { Partner } from '@/domain/entities/partner';
import { Address } from '@/domain/entities/value-objects/address';
import { CoverageArea } from '@/domain/entities/value-objects/coverage-area';
import { Document } from '@/domain/entities/value-objects/document';

export class CreatePartnerUseCase
	implements UseCase<CreatePartnerInput, CreatePartnerOutput>
{
	constructor(private readonly partnersRepository: PartnersRepository) {}

	async exec(input: CreatePartnerInput): Promise<CreatePartnerOutput> {
		const foundPartnerByDoc = await this.partnersRepository.findByDocument(
			input.document,
		);

		if (foundPartnerByDoc) {
			throw PartnerFoundError.byDocument(input.document);
		}

		let document: Document;

		try {
			document = Document.create({
				value: input.document,
			});
		} catch (error) {
			throw error;
		}

		let coverageArea: CoverageArea;

		try {
			coverageArea = CoverageArea.create({
				type: 'MultiPolygon',
				coordinates: input.coverageArea,
			});
		} catch (error) {
			throw error;
		}

		let address: Address;

		try {
			address = Address.create({
				type: 'Point',
				coordinates: input.address,
			});
		} catch (error) {
			throw error;
		}

		const partner = Partner.create({
			...input,
			document,
			coverageArea,
			address,
		});

		await this.partnersRepository.upsert(partner);

		return {
			partner,
		};
	}
}
