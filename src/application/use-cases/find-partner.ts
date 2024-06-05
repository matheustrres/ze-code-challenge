import {
	type FindPartnerByIdUseCaseInput,
	type FindPartnerByIdUseCaseOutput,
} from '../dtos/find-partner';
import { PartnerNotFoundError } from '../errors/partner-not-found';
import { type PartnersRepository } from '../partners-repository';

import { type UseCase } from '@/core/contracts/use-case';

export class FindPartnerByIdUseCase
	implements UseCase<FindPartnerByIdUseCaseInput, FindPartnerByIdUseCaseOutput>
{
	constructor(private readonly partnersRepository: PartnersRepository) {}

	async exec({
		id,
	}: FindPartnerByIdUseCaseInput): Promise<FindPartnerByIdUseCaseOutput> {
		const partner = await this.partnersRepository.findById(id);

		if (!partner) throw PartnerNotFoundError.byId(id);

		return {
			partner,
		};
	}
}
