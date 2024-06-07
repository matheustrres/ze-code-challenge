import { type UseCase } from '@/@core/contracts/use-case';

import {
	type SearchNearestPartnerUseCaseInput,
	type SearchNearestPartnerUseCaseOutput,
} from '@/app/dtos/search-nearest-partner';
import { PartnerNotFoundError } from '@/app/errors/partner-not-found';
import { type PartnersRepository } from '@/app/partners-repository';

export class SearchNearestPartnerUseCase
	implements
		UseCase<
			SearchNearestPartnerUseCaseInput,
			SearchNearestPartnerUseCaseOutput
		>
{
	constructor(private readonly partnersRepository: PartnersRepository) {}

	async exec(
		input: SearchNearestPartnerUseCaseInput,
	): Promise<SearchNearestPartnerUseCaseOutput> {
		const partner = await this.partnersRepository.findNearestByLocation(input);

		if (!partner) throw PartnerNotFoundError.byLocation(input);

		return {
			partner,
		};
	}
}
