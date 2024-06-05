import {
	type SearchNearestPartnerUseCaseInput,
	type SearchNearestPartnerUseCaseOutput,
} from '../dtos/search-nearest-partner';
import { PartnerNotFoundError } from '../errors/partner-not-found';
import { type PartnersRepository } from '../partners-repository';

import { type UseCase } from '@/core/contracts/use-case';

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
