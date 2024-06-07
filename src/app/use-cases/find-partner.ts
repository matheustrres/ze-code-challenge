import { type UseCase } from '@/@core/contracts/use-case';

import {
	type FindPartnerByIdUseCaseInput,
	type FindPartnerByIdUseCaseOutput,
} from '@/app/dtos/find-partner';
import { PartnerNotFoundError } from '@/app/errors/partner-not-found';
import { type PartnersRepository } from '@/app/partners-repository';

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
